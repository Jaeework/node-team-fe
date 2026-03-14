import { Lock, Pencil, Save } from "lucide-react";
import Button from "../../../../components/ui/button/Button";
import Label from "../../../../components/ui/label/Label";
import Input from "../../../../components/ui/input/Input";
import InputWithMessage from "../../../../components/ui/input-with-message/InputWithMessage";
import useUpdateUser from "../../../../hooks/useUpdateUser";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import LevelSelector from "../../../../components/common/LevelSelector/LevelSelector";
import { cn } from "../../../../lib/utils";
import DeleteAccountButton from "../DeleteAccountButton/DeleteAccountButton";

const ProfileDetail = () => {
  const {
    user,
    isEdit,
    setIsEdit,
    passwordEdit,
    setPasswordEdit,
    formData,
    fieldStates,
    isLoading,
    handleChange,
    handleCancel,
    handleSubmit,
  } = useUpdateUser();

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Nickname</Label>
          <InputWithMessage
            name="nickname"
            color="primary"
            readOnly={!isEdit}
            type="text"
            value={formData.nickname}
            onChange={handleChange}
            messages={isEdit ? fieldStates.nickname : undefined}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email Address</Label>
          <Input
            color="primary"
            readOnly
            type="email"
            value={user?.email ?? ""}
          />
        </div>
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out md:col-span-2",
            isEdit ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2 pt-6">
              <Label>Password</Label>
              <Button
                size="xl"
                radius="xl"
                variant="border"
                className="text-md w-fit font-bold transition-colors"
                type="button"
                onClick={() => setPasswordEdit((prev) => !prev)}
              >
                <Lock size={16} />
                <span>{passwordEdit ? "Cancel" : "Change Password"}</span>
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out md:col-span-2",
            passwordEdit ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label>New Password</Label>
                <InputWithMessage
                  name="password"
                  color="primary"
                  placeholder="Enter New Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  messages={fieldStates.password}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Confirm Password</Label>
                <InputWithMessage
                  name="secPassword"
                  color="primary"
                  placeholder="Confirm New Password"
                  type="password"
                  value={formData.secPassword}
                  onChange={handleChange}
                  messages={fieldStates.secPassword}
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-primary/10 border-t pt-6">
        <h2 className="mb-4 text-xl font-bold">Learning Preferences</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label size="sm">English Proficiency Level</Label>
            <LevelSelector
              selectedLevel={formData.level}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
        </div>
      </div>

      <div className="border-primary/10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
        <DeleteAccountButton />
        <div className="order-1 flex w-full flex-col justify-end gap-4 sm:order-2 sm:flex-row">
          {isEdit ? (
            <>
              <Button
                size="xl"
                radius="xl"
                variant={isLoading ? "disable" : "border"}
                className="text-md font-bold transition-colors"
                type="button"
                disabled={isLoading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                size="xl"
                radius="xl"
                variant={isLoading ? "disable" : "primary"}
                className="shadow-accent-blue/20 text-md relative font-semibold shadow-lg transition-all"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                  </span>
                )}
                <span className={cn(isLoading && "invisible")}>
                  <Save size={16} className="inline" />
                  <span className="ml-1">Save Changes</span>
                </span>
              </Button>
            </>
          ) : (
            <Button
              size="xl"
              radius="xl"
              variant="border"
              className="text-md font-bold shadow-lg transition-colors"
              type="button"
              onClick={() => setIsEdit(true)}
            >
              <Pencil size={16} />
              <h1>Edit Profile</h1>
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileDetail;
