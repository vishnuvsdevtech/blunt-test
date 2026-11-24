window.QUESTIONS = [
 {
  "cat": "A",
  "section": "Measurement",
  "q": "Can you state the measured accuracy of the last AI thing you built, on a set you defined before you built it?",
  "why": "This is the whole discipline in one question. If the number came after the build, it is a description, not a measurement.",
  "build": "A number, the eval file, and the commit that introduced both."
 },
 {
  "cat": "A",
  "section": "Measurement",
  "q": "Does an eval set live in the repo and run on every change?",
  "why": "Evals that are not automated decay within two weeks.",
  "build": "10\u201330 cases, a `make eval` target, and a pass threshold that fails the build."
 },
 {
  "cat": "A",
  "section": "Measurement",
  "q": "Can you name the metric you optimise, and the one you refuse to trade away?",
  "why": "Every real system trades something: recall against latency, precision against cost. Naming both shows you have decided.",
  "build": "Two metrics, the trade-off, and where the line sits."
 },
 {
  "cat": "A",
  "section": "Measurement",
  "q": "Do you know what a false positive costs versus a false negative in your domain?",
  "why": "A missing plate and a wrong plate have different prices. Systems that ignore this optimise the wrong thing.",
  "build": "A sentence per error type, with the cost in the user's units."
 },
 {
  "cat": "A",
  "section": "Measurement",
  "q": "Have you measured a dumb baseline before reaching for a model?",
  "why": "Regex, BM25, a heuristic, the previous vendor. Without a baseline you cannot claim the model helped.",
  "build": "A table with the baseline row in it."
 },
 {
  "cat": "A",
  "section": "Measurement",
  "q": "Do you have an ablation showing what each component contributes?",
  "why": "Reranking, chunking, the second model \u2014 half of them are often dead weight.",
  "build": "Remove one component at a time; report the delta."
 },
 {
  "cat": "B",
  "section": "Retrieval & data",
  "q": "Is Recall@k measured, against a baseline?",
  "why": "Most RAG demos have never been measured. This is the cheapest way to be better than most.",
  "build": "A query set, a gold answer per query, and recall@5/@10 versus BM25."
 },
 {
  "cat": "B",
  "section": "Retrieval & data",
  "q": "How do you chunk, and did you test an alternative?",
  "why": "Chunk size silently decides what your system can answer.",
  "build": "Two chunkings compared on the same eval."
 },
 {
  "cat": "B",
  "section": "Retrieval & data",
  "q": "Hybrid search or reranking \u2014 measured, or assumed?",
  "why": "Both cost latency. Both are sometimes worth it and sometimes not.",
  "build": "A/B on the eval, with latency reported."
 },
 {
  "cat": "B",
  "section": "Retrieval & data",
  "q": "What does it do when the answer is not in the corpus?",
  "why": "Refusing is a feature. Inventing is the default.",
  "build": "A recorded refusal with the score that triggered it."
 },
 {
  "cat": "B",
  "section": "Retrieval & data",
  "q": "How does the index stay fresh, and what happens to deleted documents?",
  "why": "Stale indexes answer yesterday's question confidently.",
  "build": "A reindex path and a deletion test."
 },
 {
  "cat": "B",
  "section": "Retrieval & data",
  "q": "Do you know your corpus's own failure modes?",
  "why": "OCR errors, duplicates, translations, three versions of the same policy.",
  "build": "A short list with counts per failure mode."
 },
 {
  "cat": "C",
  "section": "Model behaviour",
  "q": "What happens when the model returns malformed JSON?",
  "why": "The most common production failure, and the most commonly unhandled.",
  "build": "Schema validation, one repair attempt, then a typed failure."
 },
 {
  "cat": "C",
  "section": "Model behaviour",
  "q": "Do you know how often the model refuses or derails on your data?",
  "why": "Refusal rate on your corpus is a metric, not a surprise.",
  "build": "A count over the eval set."
 },
 {
  "cat": "C",
  "section": "Model behaviour",
  "q": "Was temperature chosen by measurement or by default?",
  "why": "Most people never change it, and cannot say why the value is right.",
  "build": "Two values compared on the eval."
 },
 {
  "cat": "C",
  "section": "Model behaviour",
  "q": "Can you detect hallucination cheaply on your task?",
  "why": "Citation check, grounding score, exact-match on extracted fields.",
  "build": "A checker that runs per answer and a false-alarm rate."
 },
 {
  "cat": "C",
  "section": "Model behaviour",
  "q": "Are prompts versioned, and can you roll one back?",
  "why": "Prompt changes are deploys; untreated they cause silent regressions.",
  "build": "Prompts in files, a version in the trace, one rollback done."
 },
 {
  "cat": "C",
  "section": "Model behaviour",
  "q": "Can you explain why one specific output happened?",
  "why": "Which prompt, which retrieved chunks, which tool result, which model version.",
  "build": "A trace you can open for a past run."
 },
 {
  "cat": "D",
  "section": "Agents & tooling",
  "q": "Do tool calls retry, with backoff, and is every attempt visible?",
  "why": "A silent retry is indistinguishable from a slow call.",
  "build": "A trace showing attempt 1 failed, 2 failed, 3 succeeded."
 },
 {
  "cat": "D",
  "section": "Agents & tooling",
  "q": "Is there a spend ceiling, checked before the call rather than totalled after?",
  "why": "Agents spend money in loops. Post-hoc accounting is not a control.",
  "build": "A run that stops mid-task with the spend on the record."
 },
 {
  "cat": "D",
  "section": "Agents & tooling",
  "q": "Do irreversible actions require a human, by default?",
  "why": "Default-allow is how an agent sends the wrong email.",
  "build": "A tool flagged for approval and a denied run that did nothing."
 },
 {
  "cat": "D",
  "section": "Agents & tooling",
  "q": "What happens after N consecutive tool failures?",
  "why": "The answer is either a refusal or a fabrication.",
  "build": "A recorded run that gives up and says so."
 },
 {
  "cat": "D",
  "section": "Agents & tooling",
  "q": "Do you keep a trace per run?",
  "why": "An agent that cannot show its work cannot be debugged or trusted.",
  "build": "A JSON trace with every step and its duration."
 },
 {
  "cat": "D",
  "section": "Agents & tooling",
  "q": "Can you bound the loop \u2014 steps, time, tokens \u2014 and prove it?",
  "why": "Unbounded loops are the classic production incident.",
  "build": "A cap, and a run that hits it."
 },
 {
  "cat": "E",
  "section": "Cost & latency",
  "q": "Do you know the cost of one successful task, not one call?",
  "why": "Retries and failures are part of the price.",
  "build": "A measured cost per completed task."
 },
 {
  "cat": "E",
  "section": "Cost & latency",
  "q": "What is your p95 latency, and which stage dominates it?",
  "why": "Average hides the experience that matters.",
  "build": "A per-stage timing breakdown."
 },
 {
  "cat": "E",
  "section": "Cost & latency",
  "q": "Do you use caching, batching or streaming deliberately?",
  "why": "Any of them can halve cost or double perceived speed.",
  "build": "A before/after measurement."
 },
 {
  "cat": "E",
  "section": "Cost & latency",
  "q": "What is the smallest model that still passes your eval?",
  "why": "Most systems run a model two sizes too big.",
  "build": "A table: model, score, cost, latency."
 },
 {
  "cat": "E",
  "section": "Cost & latency",
  "q": "Could you halve the cost for under two points of quality? What would you cut?",
  "why": "This is the question a manager asks, and it has a technical answer.",
  "build": "A named cut and the measured delta."
 },
 {
  "cat": "E",
  "section": "Cost & latency",
  "q": "Do you know the monthly cost at 1,000 users?",
  "why": "Demos die on the invoice.",
  "build": "A number, with the assumptions written down."
 },
 {
  "cat": "F",
  "section": "Production & safety",
  "q": "How do you defend against prompt injection from retrieved text or tool output?",
  "why": "Any system reading the web or a document is exposed.",
  "build": "A defence, an attack you tried, and its result."
 },
 {
  "cat": "F",
  "section": "Production & safety",
  "q": "What happens to PII in prompts, logs and traces?",
  "why": "Traces are the most common leak.",
  "build": "A redaction rule and a sample trace that shows it."
 },
 {
  "cat": "F",
  "section": "Production & safety",
  "q": "What does the system do when the provider is down or rate-limits you?",
  "why": "429 is not an edge case; it is Tuesday.",
  "build": "A fallback path, exercised."
 },
 {
  "cat": "F",
  "section": "Production & safety",
  "q": "Do you have a rollback plan for a bad prompt or model deploy?",
  "why": "You will need it once, at the worst time.",
  "build": "Versioned config and a rollback you have performed."
 },
 {
  "cat": "F",
  "section": "Production & safety",
  "q": "What alerts exist, and what is the runbook?",
  "why": "If nobody is told, it is not in production.",
  "build": "A list of signals and the first action for each."
 },
 {
  "cat": "F",
  "section": "Production & safety",
  "q": "Have you ever taken a model out of a system because it made things worse?",
  "why": "Judgement is knowing when the model is the wrong tool.",
  "build": "A case, with the numbers that decided it."
 },
 {
  "cat": "G",
  "section": "Domain & product",
  "q": "What decision does your output change, and who makes it?",
  "why": "If nothing changes, it is a demo with a UI.",
  "build": "A named user and the decision."
 },
 {
  "cat": "G",
  "section": "Domain & product",
  "q": "What is the cost of being wrong, in the user's units?",
  "why": "Money, minutes, a missed renewal, a false alarm at 3 a.m.",
  "build": "A number per error type."
 },
 {
  "cat": "G",
  "section": "Domain & product",
  "q": "What did you deliberately choose not to automate?",
  "why": "Restraint is a design decision and almost nobody can state one.",
  "build": "A list, with the reason."
 },
 {
  "cat": "G",
  "section": "Domain & product",
  "q": "Which 20% of cases cause 80% of failures?",
  "why": "The distribution is always uneven and usually surprising.",
  "build": "A failure histogram from real runs."
 },
 {
  "cat": "G",
  "section": "Domain & product",
  "q": "Has a real user used it for a week without you present?",
  "why": "A week of unattended use finds what a demo never does.",
  "build": "A person, a week, and what broke."
 },
 {
  "cat": "G",
  "section": "Domain & product",
  "q": "What is the smallest version that would still be useful?",
  "why": "The answer exposes whether you optimise for the user or the demo.",
  "build": "A one-sentence scope and what you would delete."
 },
 {
  "cat": "H",
  "section": "Evidence & craft",
  "q": "Can you demo it in 60 seconds with no slides?",
  "why": "Senior interviews are won here.",
  "build": "A recording or a live run."
 },
 {
  "cat": "H",
  "section": "Evidence & craft",
  "q": "Can somebody else run it from your README?",
  "why": "Reproducibility is the difference between a claim and an artefact.",
  "build": "A clean clone, followed by someone who is not you."
 },
 {
  "cat": "H",
  "section": "Evidence & craft",
  "q": "Do you have a written failure analysis of your own system?",
  "why": "Almost nobody publishes this, which is why it is read closely.",
  "build": "A page: what breaks, what you did, what is next."
 },
 {
  "cat": "H",
  "section": "Evidence & craft",
  "q": "Can you state the trade-off you made and what you gave up?",
  "why": "Every design is a trade. Stating it is the senior signal.",
  "build": "One sentence per major decision."
 },
 {
  "cat": "H",
  "section": "Evidence & craft",
  "q": "Does the thing run without your account, keys or laptop?",
  "why": "Dependencies on your environment are hidden fragility.",
  "build": "A container or a live URL with no private setup."
 },
 {
  "cat": "H",
  "section": "Evidence & craft",
  "q": "Would you hire yourself for this specific work? If not, why not?",
  "why": "The honest answer is the curriculum.",
  "build": "A written answer, and the first item acted on."
 }
];
