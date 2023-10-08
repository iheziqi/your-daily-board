import { ReactElement, forwardRef } from 'react';

interface ErrorModalProps {
  title: string;
  content: string | null;
  button: ReactElement<HTMLButtonElement>;
}

/**
 * Error modal.
 * Uses forwardRef to let parent component get the reference of this modal.
 * @param {Object} InfoModalProps
 * @param InfoModalProps.title the title of the modal
 * @param InfoModalProps.content the content of the modal
 * @param InfoModalProps.button a button that will close the modal and
 * 															maybe other functionalities
 * @returns
 */
const ErrorModal = forwardRef<HTMLDialogElement, ErrorModalProps>(
  function ErrorModal({ title, content, button }: ErrorModalProps, ref) {
    return (
      <dialog id={title} className="modal" ref={ref}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          {content && <p className="py-4">{content}</p>}
          <div className="modal-action">
            <form method="dialog">
              {/* <button className="btn" type="submit">
                {buttonContent}
              </button> */}
              {button}
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ErrorModal;
