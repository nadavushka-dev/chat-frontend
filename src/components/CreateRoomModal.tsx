import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createRoomSchema = z.object({
  name: z
    .string()
    .min(1, "Room name is required")
    .max(50, "Room name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Only letters, numbers, hyphens and underscores allowed"
    ),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

type CreateRoomModalProps = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    mode: "onChange",
  });

  const onFormSubmit = (data: CreateRoomFormData) => {
    onSubmit(data.name);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Create New Room</h2>
        <p className="modal-description">
          Enter a name for your new chat room
        </p>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <input
            type="text"
            className="modal-input"
            placeholder="Room name..."
            {...register("name")}
            autoFocus
          />
          {errors.name && (
            <p className="modal-error">{errors.name.message}</p>
          )}
          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn modal-btn-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn modal-btn-submit"
              disabled={!isValid || isLoading}
            >
              {isLoading ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
