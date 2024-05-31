"use client";
export default function ContactForm() {
  return (
    <div className="mx-96 mb-12 mt-12 flex flex-col items-center justify-center rounded-md bg-base-200">
      <h1 className="mt-8 text-3xl font-bold"> SELF•LESS MEDIA GROUP</h1>

      <div className="mt-12 flex flex-col">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Client and/or Company Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Best Contact Email + Phone Number
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <>
          <span className=" mt-4">Your Needs</span>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                Digital Marketing (Meta, Instagram, YouTube, Twitter, etc.)
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                Merch Consulting (Design, Print + Fulfillment)
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">New website</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                Update our current website
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                Copy Writing (Ad, Social, Script, etc.)
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                Short-form Content Creation
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                Long-form Content Creation
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto flex items-center gap-2">
                Other:
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-sm input-bordered w-full max-w-xs"
                />{" "}
              </span>
            </label>
          </div>
        </>

        <>
          <label className="form-control">
            <div className="label">
              <span className="label-text">
                What vision and goals are you hoping to achieve? Send a mood
                board and/or a link us to any examples you have
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder=""
            ></textarea>
            <div className="label"></div>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">
                What social media platform(s) are your primary focus?
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder=""
            ></textarea>
            <div className="label"></div>
          </label>
        </>

        <>
          <span className="mt-4">
            How would you rate your proficient in Social Media & Digital
            Marketing?
          </span>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">Proficient</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">Average</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">Need Help</span>
            </label>
          </div>
        </>

        <>
          <span className="mt-4">
            What is the intended use for your Ad Spot?
          </span>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">Social Media Use Only</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                Commercial Broadcast Use Only
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-2 checked:bg-red-500"
                checked
              />
              <span className="label-text mr-auto">
                We will need the Ad Spot formatted for both Social Media and
                Commercial Broadcast Use
              </span>
            </label>
          </div>
        </>

        <>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                Do you have any existing marketing and advertising assets? Drop
                any links you have below
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your budget?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">
                What is your timeline for this project? Please be as specific as
                possible
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder=""
            ></textarea>
            <div className="label"></div>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">
                Do you have any comments or requests that might better equip SMG
                during our call? Drop them below. Thanks!
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder=""
            ></textarea>
            <div className="label"></div>
          </label>
        </>
      </div>
      <button
        className="btn btn-primary mb-6 mt-4 rounded-md"
        onClick={() => alert("Feature Coming Soon!")}
      >
        Submit
      </button>
    </div>
  );
}
