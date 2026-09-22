"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SiteIcon } from "@/components/site/site-icon";
import {
  formulesFaq,
  type FormulesFaqItem,
  type FormulesFaqRichPart,
} from "@/lib/formules-content";
import { MAILTO_FAQ } from "@/lib/site";
import { cn } from "@/lib/utils";

function FaqRichParts({ parts }: { parts: FormulesFaqRichPart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (part.type === "break") {
          return <br key={index} />;
        }

        if (part.type === "strong") {
          return (
            <span
              key={index}
              className={cn(
                "type-body-strong",
                part.tone === "teal" ? "text-brand-secondary" : "text-brand",
              )}
            >
              {part.text}
            </span>
          );
        }

        return <span key={index}>{part.text}</span>;
      })}
    </>
  );
}

function FaqAnswer({ item }: { item: FormulesFaqItem }) {
  if (item.kind === "paragraphs") {
    return (
      <div className="flex w-full flex-col type-body text-brand">
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (item.kind === "rich") {
    return (
      <div className="flex w-full flex-col type-body text-brand">
        {item.blocks.map((parts, index) => (
          <p key={index}>
            <FaqRichParts parts={parts} />
          </p>
        ))}
      </div>
    );
  }

  if (item.kind === "compare") {
    return (
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Comparatif travel planner et agence de voyage
          </caption>
          <thead>
            <tr>
              <th className="w-[120px] py-2 pr-4 type-body-strong text-brand" />
              {item.columns.map((column) => (
                <th
                  key={column}
                  className="py-2 pr-4 type-body-strong text-brand"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.rows.map((row) => (
              <tr key={row.label} className="align-top">
                <th className="py-2 pr-4 type-body-strong text-brand">
                  {row.label}
                </th>
                <td className="py-2 pr-4 type-body text-brand">
                  {row.planner.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </td>
                <td className="py-2 type-body text-brand">
                  {row.agency.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (item.kind === "steps") {
    return (
      <div className="grid w-full gap-x-5 gap-y-6 md:grid-cols-2 md:grid-rows-3 md:grid-flow-col">
        {item.steps.map((step) => (
          <div key={step.step} className="flex items-start gap-4">
            <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-accent-dark type-subtitle text-bg-main">
              {step.step}
            </div>
            <div className="flex min-w-0 flex-col gap-3 type-body text-brand">
              <p className="type-body-strong">{step.title}</p>
              <p>{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {item.items.map((bullet) => (
        <div key={bullet.title} className="flex items-start gap-3">
          <span className="flex h-[22px] w-[10px] shrink-0 items-center justify-center">
            <SiteIcon src="/icons/diamond.svg" width={10} height={10} />
          </span>
          <div className="min-w-0 flex-1 type-body text-brand">
            <p>
              <span className="type-body-strong text-brand-secondary">
                {bullet.title}
              </span>
              <span>{bullet.suffix}</span>
            </p>
            <p>{bullet.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FormulesFaqList() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {formulesFaq.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="flex flex-col gap-6 border-b border-brand/30 pt-5 pb-[21px]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              id={`faq-trigger-${item.id}`}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              onClick={() =>
                setOpenId((current) => (current === item.id ? null : item.id))
              }
            >
              <span
                className={cn(
                  "px-4 py-3 type-body-strong",
                  isOpen ? "text-brand-secondary" : "text-brand",
                )}
              >
                {item.question}
              </span>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 text-[20px] leading-5 font-semibold",
                  isOpen ? "text-brand-secondary" : "text-brand/50",
                )}
              >
                +
              </span>
            </button>
            {isOpen ? (
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-trigger-${item.id}`}
              >
                <FaqAnswer item={item} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function FormulesFaq() {
  return (
    <section
      id="faq"
      className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-8 px-4 sm:px-8 lg:px-12"
    >
      <div className="flex flex-col gap-6">
        <p className="type-tag text-brand/30">
          Questions fréquentes
        </p>
        <h2 className="max-w-[513px] type-h2 text-text-brand">
          Tout ce que vous
          <br />
          voulez <span className="type-h2-italic text-brand-secondary">savoir.</span>
        </h2>
      </div>

      <FormulesFaqList />

      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex max-w-[618px] flex-col gap-4 text-accent-dark">
          <p className="type-subtitle">
            Une autre question ?
          </p>
          <p className="type-body">
            Expliquez-moi votre projet ou doute, je vous répondrai dans les plus
            brefs délais.
          </p>
        </div>
        <Button asChild variant="tertiary" size="cta" className="w-full sm:w-auto">
          <a href={MAILTO_FAQ}>contactez moi !</a>
        </Button>
      </div>
    </section>
  );
}
