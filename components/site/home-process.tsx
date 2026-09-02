import { homeProcess } from "@/lib/home-content";

export function HomeProcess() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 sm:px-8 lg:px-11">
      <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
        Comment ça fonctionne ?
      </h2>
      <div className="grid w-full gap-x-[52px] gap-y-8 md:grid-cols-2 md:grid-rows-3 md:grid-flow-col lg:px-[114px]">
        {homeProcess.map((item) => (
          <div key={item.step} className="flex items-start gap-4">
            <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-brand-navy font-heading text-[24px] text-brand-cream">
              {item.step}
            </div>
            <div className="flex flex-col gap-3 text-[15px] leading-5 text-brand">
              <p className="font-semibold">{item.title}</p>
              <p className="font-light">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center font-heading text-[24px] leading-[30px] font-bold text-brand">
        Vous n&apos;avez qu&apos;à vous occuper des réservations, des valises et des enfants !
      </p>
    </section>
  );
}
