import { forwardRef } from 'react';

interface InfoModalProps {
  title: string;
  content: string;
  buttonContent: string;
}

/**
 * Information modal.
 * Uses forwardRef to let parent component get the reference of this modal.
 * @param {Object} InfoModalProps
 * @param InfoModalProps.title the title of the modal
 * @param InfoModalProps.content the content of the modal
 * @param InfoModalProps.buttonContent the content on the button
 * @returns
 */
const InfoModal = forwardRef<HTMLDialogElement, InfoModalProps>(
  function InfoModal({ title, content, buttonContent }: InfoModalProps, ref) {
    return (
      <dialog id="my_info_modal" className="modal" ref={ref}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" type="submit">
                {buttonContent}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

export default InfoModal;
