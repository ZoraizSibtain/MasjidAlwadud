import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.js";

const ContactButton = () => {
  return (
    <Link to="/contact">
      <Button>
        Contact
      </Button>
    </Link>
  )
};

export default ContactButton;
