import React, { memo, ReactNode, FC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children, disabled = false, loading = false, onClick } = props;
  return (
    <Button
      bg="blue.400"
      color="white"
      cursor="pointer"
      margin="2px"
      _hover={{ opacity: 0.8, cursor: "pointer" }}
      transition="0.5s"
      // 念のためloadingもつけておく
      disabled={disabled || loading}
      // isLoading: trueにすると非活性
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
