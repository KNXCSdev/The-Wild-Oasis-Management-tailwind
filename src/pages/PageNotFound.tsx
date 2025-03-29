import Heading from "../ui/Heading";
import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Heading title="The page you are looking for could not be found 😢" />
      <button className="" onClick={() => navigate("/home")}>
        &larr; Go back
      </button>
    </>
  );
}

export default PageNotFound;
