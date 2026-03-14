import { Link } from "react-router-dom";
import Button from "../../../../components/ui/button/Button";

const EmailSentMessage = () => {
  return (
    <>
      <h1 className="text-ink-900 mb-2 text-3xl font-black">
        Check Your Email
      </h1>
      <p className="text-ink/50 mt-4 text-base">
        인증 메일이 발송되었습니다.
        <br />
        메일 링크는 <strong>24시간</strong> 동안 유효합니다.
      </p>
      <Link to="/login">
        <Button
          className="mt-8"
          size="xl"
          radius="xl"
          isFullWidth
          variant="primary"
        >
          로그인하러 가기
        </Button>
      </Link>
    </>
  );
};

export default EmailSentMessage;
