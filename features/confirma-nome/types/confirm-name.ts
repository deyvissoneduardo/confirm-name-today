export type ConfirmNameResult =
  | {
      status: "saved";
    }
  | {
      status: "duplicated";
    };

export type ConfirmNameMessageType = "error" | "success";

export type ConfirmNameMessage = {
  type: ConfirmNameMessageType;
  text: string;
};
