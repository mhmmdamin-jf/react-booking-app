import supabase, { supabaseUrl } from "./Supabase";
//eslint-disable-next-line
export async function getCabins({ filterField, filterValue, sortBy }) {

      let query = supabase
            .from('Cabins')
            .select('*');
      if (filterField && filterValue) {
            query = filterValue === "all" ?
                  query : filterValue.toLowerCase().includes("with") ?
                        query.gt(filterField, 0) :
                        query.eq(filterField, 0)
      }
      if (sortBy) {
            const [sortValue, modifier] = sortBy.split("-");
            console.log(sortValue, modifier)
            query = query.order(sortValue, { ascending: (modifier === "desc") ? true : false })
      }
      const { data, error } = await query;
      console.log(data)
      if (error) {
            console.log(error);
            return null;
      }
      return data;
}



export async function insertEditCabin({ newCabin, id }) {
      let baseQuery = supabase
            .from('Cabins');
      const isEditSession = Boolean(id);
      const hasImage = (String(newCabin.cabinPhoto)).startsWith(supabaseUrl);
      const imgCorrectedName = `${!hasImage && !isEditSession && Math.random()}${String(newCabin.cabinPhoto[0].name).replace('/', '')}`;
      const imagePath = hasImage ? newCabin.cabinPhoto : `${supabaseUrl}/storage/v1/object/public/cabinsImages/${imgCorrectedName}`;
      if (!isEditSession) {
            baseQuery = baseQuery
                  .insert([
                        { ...newCabin, cabinPhoto: imagePath }
                  ]);
      }
      if (isEditSession) {
            baseQuery = baseQuery
                  .update({ ...newCabin, cabinPhoto: imagePath })
                  .eq('id', id);
      }
      if (!hasImage) {
            const { error: uploadError } = await supabase
                  .storage
                  .from('cabinsImages')
                  .upload(imgCorrectedName, newCabin.cabinPhoto[0]);
            if (uploadError) {
                  console.log('up error', uploadError.message);
                  return null;
            }
      }
      const { data, error } = await baseQuery.select().single();
      if (error)
            return data;
}

export async function deleteCabins(id) {

      const { error, data } = await supabase
            .from('Cabins')
            .delete()
            .eq('id', id)
      if (error) {
            console.log(error);
            return null;
      }

      return data;


}