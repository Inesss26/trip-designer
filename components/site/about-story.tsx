import { aboutStory } from "@/lib/about-content";

export function AboutStory() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] justify-center px-4 sm:px-8 lg:px-11">
      <div className="flex max-w-[552px] flex-col gap-11">
        <div className="flex flex-col gap-5">
          <p className="type-tag text-brand/30">
            {aboutStory.kicker}
          </p>
          <h2 className="type-h2 text-text-brand">
            {`${aboutStory.title} ${aboutStory.titleMiddle} `}
            <span className="type-h2-italic text-brand-secondary">{aboutStory.titleAccent}</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6 type-body text-brand">
          {aboutStory.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p>
            {aboutStory.turningPoint}{" "}
            <span className="type-body-strong">{aboutStory.turningPointStrong}</span>
          </p>
          <p className="type-body-strong text-brand-secondary">{aboutStory.closing}</p>
        </div>
      </div>
    </section>
  );
}
