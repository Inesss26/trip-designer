import { homeProcess } from "@/lib/home-content";

export function HomeProcess() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-4 sm:px-8 lg:px-11">
      <div className="flex w-full flex-col items-center gap-10">
        <h2 className="type-h2 text-text-brand">
          Comment ça fonctionne ?
        </h2>
        <div className="grid w-full gap-x-[52px] gap-y-8 md:grid-cols-2 md:grid-rows-3 md:grid-flow-col lg:px-[114px]">
          {homeProcess.map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-accent-dark type-subtitle text-text-on-dark">
                {item.step}
              </div>
              <div className="flex flex-col gap-3 type-body text-text-brand">
                <p className="type-body-strong">{item.title}</p>
                <p className="type-body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center type-subtitle text-brand">
        Vous n&apos;avez plus qu&apos;à vous occuper des réservations et des valises !
      </p>
    </section>
  );
}
