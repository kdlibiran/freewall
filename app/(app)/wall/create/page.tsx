export default function CreateWall() {
  return (
    <div className="h-[80vh] align-middle flex flex-1 w-[50vh]">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/api/create/wall"
        method="post"
      >
        <label className="text-md" htmlFor="name">
          Wall Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="wall name"
          required
        />
        <label className="text-md" htmlFor="desc">
          Wall Description
        </label>
        <textarea
          className="rounded-md px-4 py-2 bg-inherit border mb-6 h-[20vh]"
          name="desc"
          placeholder="Write the description of your wall here."
        />
        <button className="border rounded-md px-4 py-2 text-foreground mb-2">
          Create Wall
        </button>
      </form>
    </div>
  );
}
