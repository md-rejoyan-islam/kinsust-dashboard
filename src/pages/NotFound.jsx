export default function NotFound() {
  return (
    <section className="  text-center text-slate-800  dark:text-[#fff]">
      <div className="lg:py-24 md:py-12 py-8">
        <h1 className="lg:text-8xl text-6xl  font-black md:py-10 py-6 text-[#fc535a]">
          404
        </h1>
        <p className="lg:text-5xl md:text-4xl text-3xl font-bold  pb-24">
          No page Found!
        </p>
        <button
          onClick={() => {
            window.history.back();
          }}
          className="py-2 px-3 rounded-md bg-violet-400"
        >
          Back
        </button>
      </div>
    </section>
  );
}
