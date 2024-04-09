import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabins } from "../../services/apiCabins";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useInsertCabin } from "./useInsertCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { toast } from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns:${props => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRowObj(prop) {
  const { cabin, columns } = prop;
  const { isCreating: isCreatingDuplicate, insertCabin: insertDuplicate } = useInsertCabin();
  const queryClient = useQueryClient();
  // const [showForm, setShowForm] = useState(false);
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteCabins(id), onSuccess: () => {
      toast.success('deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    }, onError: () => { toast.success('cant delete') }
  });
  const { image: cabinPhoto, name, regularPrice: price, discount } = cabin;
  const isLoading = isCreatingDuplicate || isDeleting;
  const { id, ...duplicateCabin } = cabin;
  return (
    <>
      <TableRow columns={columns}>
        <div></div>
        <Img src={cabinPhoto} />
        <Cabin>{name}</Cabin>
        <Price>{price}</Price>
        <Discount>{discount}</Discount>
        {/* <button disabled={isLoading} onClick={() => insertDuplicate({ newCabin: { ...duplicateCabin, name: `Copy of'${name}` } })}>duplicate</button>
            <button disabled={isLoading} onClick={() => { setShowForm(!showForm) }}>edit</button>
            <button disabled={isLoading} onClick={() => deleteCabin(id)}>delete</button> */}
        <Menus.Toggle id={id} />
      </TableRow >
      <Modal>
        <Menus.List id={id}>
          <Menus.Button disabled={isLoading} onClick={() => insertDuplicate({ newCabin: { ...duplicateCabin, name: `Copy of'${name}` } })}>
            <span>duplicate</span>
          </Menus.Button>
          <Menus.Button>
            <Modal.Open opens='cabin-edit'>
              <span>edit</span>
            </Modal.Open>
          </Menus.Button>
          <Menus.Button>
            <Modal.Open opens='cabin-delete'>
              <span>delete</span>
            </Modal.Open>
          </Menus.Button>
        </Menus.List>
        <Modal.Window name='cabin-delete'>
          <ConfirmDelete disabled={isLoading} onConfirm={() => deleteCabin(id)} resourceName={name} />
        </Modal.Window>
        <Modal.Window name='cabin-edit'>
          <CreateCabinForm cabinItem={cabin} />
        </Modal.Window>
      </Modal>
      {/* {showForm && <CreateCabinForm cabinItem={cabin.cabin} />} */}
    </>
  )
}

export default CabinRowObj;