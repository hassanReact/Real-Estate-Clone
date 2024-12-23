"use client";

import FileInput from "@/app/Components/fileUpload";  // Use 'Components' with a capital C
import { updateUserAvatar } from "@/lib/actions/user";
import { uploadAvatar } from "@/lib/upload";
import { PencilIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <button onClick={onOpen}>
        <PencilIcon className="w-6 text-slate-400 hover:text-primary transition-colors mx-6
        mt-3" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload Avatar</ModalHeader>
              <ModalBody>
                <FileInput onChange={handleFileChange} />
                {image && <Image src={URL.createObjectURL(image)} height={500} width={400} alt="Avatar preview" />}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  color="primary"
                  onPress={async () => {
                    setIsSubmitting(true);
                    if (!image) {
                      onClose();
                      return;
                    }
                    const avatarUrl = await uploadAvatar(image);
                    await updateUserAvatar(avatarUrl, userId);
                    router.refresh();
                    setIsSubmitting(false);
                    onClose();
                  }}
                >
                  Change Avatar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UploadAvatar;
