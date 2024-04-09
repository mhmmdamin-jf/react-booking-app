import { getToday } from "../utils/helpers";
import supabase from "./Supabase";
//eslint-disable-next-line
export async function getBooking({ id }) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Cabins(*), Guests(*)")
    .eq("id", String(id))
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return data;
}
//eslint-disable-next-line
export async function getBookings({ filterField, filterValue, filterMethod, FilterMethodValue, FilterMethodField, sortBy, page }) {
  let query = supabase.from("Bookings").select("*,Cabins(*),Guests(*)");
  if (filterField && filterValue && filterMethod && FilterMethodValue && FilterMethodField) {
    query = filterValue === "all" ? query : query.eq(filterField, filterValue)[filterMethod](FilterMethodField, FilterMethodValue);
  }
  if (filterField && filterValue && !filterMethod) {
    query = filterValue === "all" ? query : query.eq(filterField, filterValue)
  }
  if (sortBy) {
    const [sortValue, modifier] = sortBy.split("-");
    query = query.order(sortValue, { ascending: (!modifier || modifier === "desc") ? false : true })
  }
  if (page) {
    query = query.range((page - 1) * 10 + 1, page * 10);
  }
  const { data, error, count } = await query;
  if (error) {
    console.log(error.message);
    throw new Error("Bookings cannot get.")
  }
  return { data, count };
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extrasPrice,numNights,status")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();
  console.log(id, obj)
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
