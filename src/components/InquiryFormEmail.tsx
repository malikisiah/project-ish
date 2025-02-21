import type { Inputs } from "~/server/api/routers/router";

interface InquiryFormEmailProps {
  data: Inputs;
}

export const InquiryFormEmail: React.FC<Readonly<InquiryFormEmailProps>> = ({
  data,
}) => (
  <>
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}
    </div>
  </>
);
