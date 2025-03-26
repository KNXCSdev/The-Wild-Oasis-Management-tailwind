import { RxCross1 } from "react-icons/rx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddCabin } from "./useAddCabin";

type CabinFormProps = {
  showForm: (e: boolean) => null;
};

interface Cabin {
  discount: number;
  description: string;
  image: FileList;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export default function CabinForm({ showForm }: CabinFormProps) {
  const { register, handleSubmit, getValues } = useForm<Cabin>();
  const { isAddingCabin, mutate: addCabin } = useAddCabin();

  const onSubmit: SubmitHandler<Cabin> = (data) => {
    const image = data.image[0];

    addCabin({ ...data, image }, { onSettled: () => showForm(false) });
  };

  return (
    <div
      className="fixed top-0 left-0 z-30 h-screen w-full bg-(--backdrop-color) backdrop-blur-xs transition"
      onClick={() => {
        showForm(false);
      }}
    >
      <div
        className="bg-grey-0 fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-(--border-radius-lg) px-[4rem] py-[3.2rem] shadow-(--shadow-lg) transition"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-5 translate-x-2 rounded-md border-none bg-none p-1 transition"
          onClick={() => showForm(false)}
        >
          <RxCross1 size={20} />
        </button>
        <div>
          <form
            className="w-[80rem] overflow-hidden text-2xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
              <label htmlFor="name" className="font-medium">
                Cabin name
              </label>
              <input
                type="text"
                id="name"
                className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 text-[1.6rem] shadow-(--shadow-sm)"
                disabled={isAddingCabin}
                {...register("name", { required: "This field is required" })}
              />
            </div>
            <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
              <label htmlFor="maxCapacity" className="font-medium">
                Maximum capacity
              </label>
              <input
                type="number"
                id="maxCapacity"
                className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 text-[1.6rem] shadow-(--shadow-sm)"
                disabled={isAddingCabin}
                {...register("maxCapacity", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Capacity should be at least 1",
                  },
                })}
              />
            </div>
            <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
              <label htmlFor="regularPrice" className="font-medium">
                Regular price
              </label>
              <input
                type="number"
                id="regularPrice"
                disabled={isAddingCabin}
                className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 shadow-(--shadow-sm)"
                {...register("regularPrice", {
                  required: "This field is required",
                })}
              />
            </div>
            <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
              <label htmlFor="discount" className="font-medium">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 text-[1.6rem] shadow-(--shadow-sm)"
                defaultValue={0}
                disabled={isAddingCabin}
                {...register("discount", {
                  required: "This field is required",
                  validate: (value) =>
                    value <= getValues().regularPrice ||
                    "Discount should be less than regular price",
                })}
              />
            </div>
            <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
              <label htmlFor="description" className="font-medium">
                Description for website
              </label>
              <textarea
                id="description"
                className="bg-grey-0 h-32 w-full rounded-md border border-(--color-grey-300) px-3 py-3 shadow-(--shadow-sm)"
                disabled={isAddingCabin}
                {...register("description", {
                  required: "This field is required",
                })}
              />
            </div>
            <div className="grid h-full grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
              <label htmlFor="image" className="font-medium">
                Cabin photo
              </label>
              <input
                id="image"
                type="file"
                className="file:text-brand-50 file:bg-brand-600 file:hover:bg-brand-700 mr-[1.2rem] rounded-(--border-radius-sm) text-[1.4rem] file:cursor-pointer file:rounded-lg file:border-none file:px-[1.2rem] file:py-[0.8rem] file:font-medium file:transition"
                {...register("image", { required: "This field is required" })}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 last:pb-0">
              <button
                type="reset"
                className="text-grey-600 bg-grey-0 rounded-lg border border-(--color-grey-200) px-6 py-5 text-sm font-semibold shadow-(--shadow-sm)"
              >
                Reset
              </button>
              <button
                className="text-brand-50 bg-brand-600 rounded-lg border border-(--color-grey-200) px-6 py-5 text-sm font-semibold shadow-(--shadow-sm)"
                type="submit"
              >
                Create new cabin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
