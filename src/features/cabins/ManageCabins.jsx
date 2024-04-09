import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import { QueryTable } from "./CabinTable"
import CreateCabinForm from "./CreateCabinForm"

function ManageCabins() {
      return (
            <>
                  <Modal>
                        <Modal.Open opens='cabin-form'>
                              <Button>Add Cabin</Button>
                        </Modal.Open>
                        <Modal.Window name='cabin-form'>
                              <CreateCabinForm />
                        </Modal.Window>
                        <Modal.Open opens='cabin-table'>
                              <Button>Cabin Table</Button>
                        </Modal.Open>
                        <Modal.Window name='cabin-table'>
                              <QueryTable isCabinTable={true} />
                        </Modal.Window>
                  </Modal>
            </>
      )
}

export default ManageCabins