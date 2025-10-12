import CheckButton from "./CheckButton";

interface CatManagement {
  id:number,
  name:string,
  mood: boolean | null,
  poop:boolean | null,
  meal:boolean | null,
  vitality:number,
  record:string,
  owner_id:number
}

interface SuccessModalProps {
  catManagement: CatManagement | null;
  SuccessModalOpen: ()=> void;
  selectedTargetCat: string;
}




const SuccessModal = ({ catManagement, SuccessModalOpen, selectedTargetCat }:SuccessModalProps) => {
  if (!catManagement) return null;
  return (
    <>
    <dialog id="modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg"><CheckButton onClick={SuccessModalOpen} /></h3>
        <p className="py-4">無事、{selectedTargetCat}ちゃんのけんこう度が保存されました！</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">閉じる</button>
          </form>
        </div>
      </div>
    </dialog>
    </>
  );
};


export default SuccessModal;