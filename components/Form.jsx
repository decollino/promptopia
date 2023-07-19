import Link from "next/link";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  handlePhotoChange,
}) => {
  //console.log("post Form: ", post);
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Patient</span>
      </h1>
      <p className="desc text-left max-w-md">{type} a new Patient.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Patient name:
          </span>

          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder="Write your patient name here"
            required
            className="form_input "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Birth Date:
          </span>
          <input
            value={post.birthDate}
            onChange={(e) => setPost({ ...post, birthDate: e.target.value })}
            type="date"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            email:
          </span>
          <input
            value={post.email}
            onChange={(e) => setPost({ ...post, email: e.target.value })}
            placeholder="Write the patient email"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Hospital Name{" "}
            <span className="font-normal">
              (#sirio, #einstein, #cruz, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        {/*        <input type="file" name="photo" onChange={handlePhotoChange} />*/}

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
