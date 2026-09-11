import { aboutStory } from "@/lib/about-content";

export function AboutStory() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] justify-center px-4 sm:px-8 lg:px-11">
      <div className="flex max-w-[552px] flex-col gap-11">
        <div className="flex flex-col gap-5">
          <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
            {aboutStory.kicker}
          </p>
          <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
            {aboutStory.title}
            <br />
            {aboutStory.titleMiddle}{" "}
            <span className="italic text-brand-teal">{aboutStory.titleAccent}</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6 text-[15px] leading-5 font-light text-brand">
          {aboutStory.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p>
            {aboutStory.turningPoint}{" "}
            <span className="font-semibold">{aboutStory.turningPointStrong}</span>
          </p>
          <p className="font-semibold text-brand-teal">{aboutStory.closing}</p>
        </div>
      </div>
    </section>
  );
}
