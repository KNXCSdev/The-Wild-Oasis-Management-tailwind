import MoonLoader from "react-spinners/MoonLoader";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

export default function SettingsForm() {
  const { settings, isLoading } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};
  const { updateSetting, isUpdating } = useUpdateSettings();

  if (isLoading)
    return (
      <div className="self-center">
        <MoonLoader color="#0038ff" />
      </div>
    );

  function handleUpdate(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [fieldName]: value });
  }

  return (
    <div className="bg-grey-0 rounded-(--border-radius-lg) px-[4rem] py-[3.2rem] transition">
      <form className="w-full overflow-hidden text-2xl">
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="minBookingLength" className="font-medium">
            Minimum nights/booking
          </label>
          <input
            type="number"
            id="minBookingLength"
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 text-[1.6rem] shadow-(--shadow-sm)"
            defaultValue={minBookingLength}
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
            disabled={isUpdating}
          />
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="maxBookingLength" className="font-medium">
            Maximum nights/booking
          </label>
          <input
            type="number"
            id="maxBookingLength"
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 text-[1.6rem] shadow-(--shadow-sm)"
            defaultValue={maxBookingLength}
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
            disabled={isUpdating}
          />
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="maxGuestsPerBooking" className="font-medium">
            Maximum guests/booking
          </label>
          <input
            type="number"
            id="maxGuestsPerBooking"
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 shadow-(--shadow-sm)"
            defaultValue={maxGuestsPerBooking}
            onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
            disabled={isUpdating}
          />
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="breakfastPrice" className="font-medium">
            Breakfast price
          </label>
          <input
            type="number"
            id="breakfastPrice"
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 shadow-(--shadow-sm)"
            defaultValue={breakfastPrice}
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
}
