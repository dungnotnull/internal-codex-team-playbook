/* ===== Quiz engine - song ngữ vi/ja, chấm điểm, KHÔNG lưu lịch sử =====
 * Chỉ lưu tuỳ chọn ngôn ngữ (localStorage 'quiz_lang'); câu trả lời không được lưu. */
(function () {
  "use strict";

  var DATA = window.QUIZ_DATA;
  var LANGS = ["vi", "ja"];
  var lang = "vi";
  var graded = false;
  var questions = [];

  var form = document.getElementById("quiz-form");
  var questionsEl = document.getElementById("questions");
  var answeredCountEl = document.getElementById("answered-count");
  var resultPanel = document.getElementById("result-panel");
  var scoreCard = document.getElementById("score-card");
  var scoreNote = document.getElementById("score-note");
  var reviewHint = document.getElementById("review-hint");
  var btnRetake = document.getElementById("btn-retake");
  var topbar = document.querySelector(".topbar");
  var footerP = document.querySelector(".footer p");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmt(str) {
    var args = Array.prototype.slice.call(arguments, 1);
    return String(str).replace(/\{(\d+)\}/g, function (m, i) {
      var v = args[Number(i)];
      return v === undefined ? m : String(v);
    });
  }

  function initialLang() {
    try {
      var fromUrl = new URLSearchParams(window.location.search).get("lang");
      if (fromUrl && LANGS.indexOf(fromUrl) !== -1) return fromUrl;
      var saved = window.localStorage.getItem("quiz_lang");
      if (saved && LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) { /* ignore */ }
    return "vi";
  }

  function setLang(l, forceReset) {
    lang = l;
    try { window.localStorage.setItem("quiz_lang", lang); } catch (e) { /* ignore */ }
    resetState(forceReset);
    applyLocale();
  }

  function resetState(keepRendered) {
    graded = false;
    form.reset();
    document.getElementById("result-panel").hidden = true;
    form.classList.remove("graded-locked");
    document.body.classList.remove("graded");
    if (!keepRendered) renderQuestions();
    updateAnswered();
  }

  function applyLocale() {
    var ui = DATA[lang].ui;
    document.documentElement.setAttribute("lang", lang);
    document.title = ui.htmlTitle;
    topbar.querySelector(".kicker").textContent = ui.kicker;
    topbar.querySelector("h1").textContent = ui.h1;
    topbar.querySelector(".sub").innerHTML = ui.sub;
    topbar.querySelector(".badge.b-green").textContent = ui.legendGreen;
    topbar.querySelector(".badge.b-multi").textContent = ui.legendMulti;
    topbar.querySelector(".badge.plain").textContent = ui.legendDiff;
    answeredCountEl.parentNode.innerHTML = ui.answered + " <strong id=\"answered-count\">0/" + questions.length + "</strong>";
    answeredCountEl = document.getElementById("answered-count");
    document.getElementById("btn-submit").textContent = ui.submit;
    btnRetake.textContent = ui.retake;
    reviewHint.textContent = ui.reviewHint;
    footerP.textContent = ui.footer;
  }

  function diffTag(diff) {
    var ui = DATA[lang].ui;
    var cls = diff === "hard" ? " t-kho" : diff === "medium" ? " t-tb" : " t-de";
    return '<span class="tag' + cls + '">' + esc(ui.diffs[diff]) + "</span>";
  }

  function renderQuestions() {
    var ui = DATA[lang].ui;
    questions = DATA[lang].questions;
    var html = "";
    questions.forEach(function (item, i) {
      var tags =
        '<span class="tag">' + esc(item.cat) + "</span>" +
        diffTag(item.diff) +
        (item.multi ? '<span class="tag t-multi">' + esc(ui.multiBadge) + "</span>" : "");
      var opts = item.options
        .map(function (opt, j) {
          var input =
            '<input type="' + (item.multi ? "checkbox" : "radio") + '" name="q' + i +
            '" id="q' + i + "_" + j + '" value="' + j + '" />';
          return '<label class="opt" for="q' + i + "_" + j + '">' + input +
            '<span class="opt-text">' + esc(opt) + "</span></label>";
        })
        .join("");

      html +=
        '<div class="q-card" id="qc' + i + '">' +
        '<div class="q-head"><span class="q-num">' + esc(fmt(ui.qNumFmt, i + 1, questions.length)) + "</span>" +
        '<span class="q-tags">' + tags + "</span></div>" +
        '<div class="q-text">' + esc(item.q) + "</div>" +
        (item.img && window.QUIZ_DIAGRAMS && window.QUIZ_DIAGRAMS[item.img]
          ? '<figure class="q-img">' + window.QUIZ_DIAGRAMS[item.img] +
            '<figcaption>' + esc(item.imgNote || "") + "</figcaption></figure>"
          : "") +
        opts +
        '<div class="q-result" id="qr' + i + '" hidden></div>' +
        "</div>";
    });
    questionsEl.innerHTML = html;
  }

  function chosen(i) {
    var picked = [];
    var boxes = form.elements["q" + i];
    if (!boxes) return picked;
    if (boxes.length === undefined) boxes = [boxes];
    Array.prototype.forEach.call(boxes, function (b) {
      if (b.checked) picked.push(Number(b.value));
    });
    return picked;
  }

  function updateAnswered() {
    var n = 0;
    questions.forEach(function (_, i) { if (chosen(i).length > 0) n++; });
    answeredCountEl.textContent = n + "/" + questions.length;
  }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var sa = a.slice().sort(function (x, y) { return x - y; });
    var sb = b.slice().sort(function (x, y) { return x - y; });
    for (var i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return false;
    return true;
  }

  function optionState(item, j, chosenArr) {
    var isCorrect = item.correct.indexOf(j) !== -1;
    var isPicked = chosenArr.indexOf(j) !== -1;
    if (isCorrect && isPicked) return "correct";
    if (isCorrect && !isPicked) return "missed";
    if (!isCorrect && isPicked) return "wrong";
    return "";
  }

  function explainBlock(item) {
    var ui = DATA[lang].ui;
    var refsHtml = (item.refs || [])
      .map(function (r) {
        return '<a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
          esc(r.label) + "</a>";
      })
      .join('<span class="sep"> · </span>');
    var fig =
      item.img && window.QUIZ_DIAGRAMS && window.QUIZ_DIAGRAMS[item.img]
        ? '<figure class="q-img small">' + window.QUIZ_DIAGRAMS[item.img] +
          '<figcaption>' + esc(item.imgNote || "") + "</figcaption></figure>"
        : "";
    return (
      '<div class="explain">' +
      "<strong>" + esc(ui.explain) + "</strong>" + esc(item.note) +
      "</div>" +
      (refsHtml
        ? '<div class="refs"><span class="ref-title">' + esc(ui.refsLabel) + "</span> " +
          refsHtml + "</div>"
        : "") +
      fig
    );
  }

  function grade() {
    var ui = DATA[lang].ui;
    var correctCount = 0;
    var wrongList = [];
    var perCat = {};

    questions.forEach(function (item, i) {
      var picked = chosen(i);
      var card = document.getElementById("qc" + i);
      var resEl = document.getElementById("qr" + i);

      var labels = card.querySelectorAll(".opt");
      labels.forEach(function (labelEl, j) {
        var st = optionState(item, j, picked);
        if (st) labelEl.classList.add(st);
      });

      var isRight = sameSet(picked, item.correct);
      if (isRight) correctCount++;
      else wrongList.push(i + 1);

      if (!perCat[item.cat]) perCat[item.cat] = { ok: 0, total: 0 };
      perCat[item.cat].total++;
      if (isRight) perCat[item.cat].ok++;

      card.classList.add(isRight ? "r-correct" : "r-wrong");
      resEl.hidden = false;
      resEl.className = "q-result " + (isRight ? "correct" : "wrong");

      var verdictHtml = isRight
        ? "<strong>" + esc(ui.right) + "</strong>"
        : "<strong>" + esc(ui.wrong) + "</strong> " + esc(ui.correctAnswerPrefix) + "<em>" +
          item.correct.map(function (k) { return esc(item.options[k]); }).join(" | ") + "</em>" +
          (picked.length
            ? " - " + esc(ui.youChose) + "<em>" + picked.map(function (k) { return esc(item.options[k]); }).join(" | ") + "</em>"
            : " - " + esc(ui.notChosen));

      resEl.innerHTML = verdictHtml + explainBlock(item);
    });

    var points = Math.round((correctCount / questions.length) * 1000) / 100;
    var band =
      points >= 9 ? ui.bands[0]
      : points >= 7 ? ui.bands[1]
      : points >= 5 ? ui.bands[2]
      : points >= 3 ? ui.bands[3]
      : ui.bands[4];

    var catRows = Object.keys(perCat)
      .map(function (c) {
        return "<li>" + esc(c) + ": " + perCat[c].ok + "/" + perCat[c].total + "</li>";
      })
      .join("");

    scoreCard.innerHTML =
      '<span class="points">' + points.toFixed(2) + '</span><span class="of"> / 10</span>' +
      '<div class="meta">' + esc(fmt(ui.scoreMetaFmt, correctCount, questions.length, questions.length - correctCount)) + "</div>" +
      '<div class="meta">' + esc(ui.byGroup) + '<ul style="margin:6px 0 0 18px;padding:0;">' + catRows + "</ul></div>";

    scoreNote.innerHTML = wrongList.length
      ? fmt(ui.wrongListFmt, wrongList.map(function (n) { return "#" + n; }).join(" · "))
      : esc(ui.allPerfect);

    form.classList.add("graded-locked");
    graded = true;
    document.body.classList.add("graded");
    resultPanel.hidden = false;
    if (resultPanel.previousElementSibling !== form) {
      form.parentNode.insertBefore(resultPanel, form);
    }
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (graded) return;
    var unanswered = [];
    questions.forEach(function (_, i) { if (chosen(i).length === 0) unanswered.push(i + 1); });
    if (unanswered.length > 0) {
      var ui = DATA[lang].ui;
      var okGo = window.confirm(
        fmt(ui.confirmUnansweredFmt, unanswered.length, "#" + unanswered.join(" · #"))
      );
      if (!okGo) return;
    }
    grade();
  });

  questionsEl.addEventListener("change", function (e) {
    var target = e.target;
    if (!target || !target.name || target.name.charAt(0) !== "q") return;
    var idx = Number(target.name.slice(1));
    var card = document.getElementById("qc" + idx);
    card.querySelectorAll(".opt").forEach(function (labelEl) {
      var inputEl = labelEl.querySelector("input");
      labelEl.classList.toggle("picked", inputEl.checked);
    });
    updateAnswered();
  });

  btnRetake.addEventListener("click", function () {
    resetState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll("#lang-switch .lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var l = btn.getAttribute("data-lang");
      if (l && l !== lang) setLang(l);
    });
  });

  lang = initialLang();
  renderQuestions();
  applyLocale();
  updateAnswered();
})();
