import { useNavigate } from "react-router";
import userImage from '@/assets/images/user.jpg';

const AvatarBox = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col space-y-2 cursor-pointer"
      onClick={() => navigate('/')}
    >
      <div className="h-12 w-12 rounded-full overflow-hidden bg-surface-container flex-shrink-0">
        <img
          alt="Zoraiz Sibtain"
          src={userImage}
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className="font-['Space_Grotesk'] font-bold text-xl tracking-tighter text-on-surface">
        Zoraiz Sibtain
      </h1>
      <p className="font-['Space_Grotesk'] tracking-tight text-[10px] uppercase text-on-surface-variant">
        Software & AI Engineer
      </p>
    </div>
  );
};

export default AvatarBox;
