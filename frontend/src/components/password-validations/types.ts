export type PasswordRequirementsProps = {
  password: string;
};

export type Requirement = {
  label: string;
  test: (password: string) => boolean;
};
