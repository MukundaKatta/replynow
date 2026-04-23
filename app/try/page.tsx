"use client";

import { useState } from "react";
import Link from "next/link";

type Sentiment = "positive" | "negative" | "neutral";

interface Draft {
  label: string;
  tone: string;
  body: string;
}

function detectSentiment(review: string): Sentiment {
  const lower = review.toLowerCase();
  const positiveKeywords = ["love", "great", "excellent", "amazing", "fantastic", "wonderful", "best", "perfect", "awesome"];
  const negativeKeywords = ["bad", "terrible", "awful", "horrible", "worst", "poor", "disgusting", "rude", "disappointed"];
  const hasPositive = positiveKeywords.some((kw) => lower.includes(kw));
  const hasNegative = negativeKeywords.some((kw) => lower.includes(kw));
  if (hasNegative) return "negative";
  if (hasPositive) return "positive";
  return "neutral";
}

function generateDrafts(review: string, sentiment: Sentiment): Draft[] {
  if (sentiment === "positive") {
    return [
      {
        label: "Warm",
        tone: "warm",
        body: `Thank you so much for this kind review! It genuinely made our day. Feedback like yours reminds us exactly why we do what we do — and we can't wait to serve you again soon. 🙌`,
      },
      {
        label: "Professional",
        tone: "professional",
        body: `Thank you for taking the time to share your experience. We're pleased to hear you had a positive visit and appreciate your kind words. We look forward to welcoming you back.`,
      },
      {
        label: "Friendly & specific",
        tone: "friendly",
        body: `Wow, we really appreciate that! Reviews like this keep the whole team motivated. Come back anytime — we'd love to make your next visit just as good (or better).`,
      },
    ];
  }

  if (sentiment === "negative") {
    return [
      {
        label: "Apology — de-escalating",
        tone: "apology",
        body: `We're truly sorry to hear about your experience — this is not the standard we hold ourselves to. Please reach out to us directly so we can make things right. Your feedback is taken seriously and will be addressed immediately.`,
      },
      {
        label: "Professional apology",
        tone: "professional",
        body: `Thank you for sharing your feedback. We sincerely apologize that your experience did not meet expectations. We'd appreciate the opportunity to speak with you directly to understand what happened and to make it right.`,
      },
      {
        label: "Ownership + resolution offer",
        tone: "resolution",
        body: `We hear you, and we're sorry. What you've described shouldn't happen, and we take full ownership. Could you DM us your contact details? The owner would like to personally follow up and make this right.`,
      },
    ];
  }

  // neutral
  return [
    {
      label: "Warm thank-you",
      tone: "warm",
      body: `Thank you so much for leaving a review — it means a lot to us! We hope to see you again soon and continue to earn your trust.`,
    },
    {
      label: "Professional",
      tone: "professional",
      body: `Thank you for sharing your experience. We appreciate the feedback and hope to have the pleasure of serving you again.`,
    },
    {
      label: "Invite back",
      tone: "friendly",
      body: `Thanks for the review! We'd love to have you back again soon. If there's anything we can do to make your next visit even better, don't hesitate to let us know.`,
    },
  ];
}

const TONE_COLORS: Record<string, string> = {
  warm: "bg-sky-50 text-sky-900 border-sky-200",
  professional: "bg-neutral-50 text-neutral-900 border-neutral-200",
  friendly: "bg-sky-50 text-sky-900 border-sky-200",
  apology: "bg-amber-50 text-amber-900 border-amber-200",
  resolution: "bg-amber-50 text-amber-900 border-amber-200",
};

export default function TryPage() {
  const [review, setReview] = useState("");
  const [drafts, setDrafts] = useState<Draft[] | null>(null);
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!review.trim()) return;
    const detected = detectSentiment(review);
    setSentiment(detected);
    setDrafts(generateDrafts(review, detected));
  }

  function handleCopy(text: string, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function handleReset() {
    setReview("");
    setDrafts(null);
    setSentiment(null);
    setCopied(null);
  }

  const sentimentLabel: Record<Sentiment, string> = {
    positive: "Positive review detected — warm + inviting drafts",
    negative: "Critical review detected — de-escalating drafts",
    neutral: "Neutral review — balanced thank-you drafts",
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
          ReplyNow
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-600">
            Try it now
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Paste a Google review, get 3 reply drafts
          </h1>
          <p className="mt-3 text-neutral-500">
            No sign-up required. This is a v0 preview — mocked responses, real quality.
          </p>
        </div>

        {!drafts ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-neutral-700">Paste the review text</span>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                rows={5}
                placeholder={`e.g. "Best haircut I've had in years. Marcus really listened to what I wanted."`}
                className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 resize-none"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
            >
              Generate reply drafts →
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                Review
              </p>
              <p className="text-sm italic text-neutral-700">&ldquo;{review}&rdquo;</p>
              {sentiment && (
                <p className="mt-2 text-xs text-sky-700 font-medium">
                  {sentimentLabel[sentiment]}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {drafts.map((draft, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 ${TONE_COLORS[draft.tone] ?? "bg-white border-neutral-200"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                      Draft {i + 1} · {draft.label}
                    </span>
                    <button
                      onClick={() => handleCopy(draft.body, i)}
                      className="text-xs font-medium px-3 py-1 rounded-full border border-current opacity-60 hover:opacity-100 transition"
                    >
                      {copied === i ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed">{draft.body}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full rounded-full border border-neutral-300 px-7 py-3 text-sm font-medium transition hover:border-neutral-900"
              >
                ← Try another review
              </button>
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center">
                <p className="text-sm font-semibold text-sky-900 mb-1">
                  Want this for every review, automatically?
                </p>
                <p className="text-xs text-sky-700 mb-4">
                  ReplyNow monitors your Google reviews and delivers drafts to your inbox overnight.
                </p>
                <Link
                  href="/#waitlist"
                  className="inline-block rounded-full bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  Join the waitlist
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
