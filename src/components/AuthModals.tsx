import { EnhancedAuthFlow } from "./EnhanceAuthFlow";
import { AuthFlow } from "./AuthFlow2";

export default function AuthModals() {
  return (
    <div className="flex justify-center space-x-4 p-4">
      <EnhancedAuthFlow />
      <AuthFlow />
    </div>
  );
}
