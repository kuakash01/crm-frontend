import { useAppSelector } from "@/store/hooks";

export const usePermission = () => {
  const permissions = useAppSelector(
    (state) => state.auth.user?.permissions
  );

  const can = (permission: string) =>
    permissions?.includes(permission);

  const canAny = (required: string[]) =>
    required.some((permission) =>
      permissions?.includes(permission)
    );

  const canAll = (required: string[]) =>
    required.every((permission) =>
      permissions?.includes(permission)
    );

  return {
    can,
    canAny,
    canAll,
  };
};