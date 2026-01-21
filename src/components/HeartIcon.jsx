import { Heart } from 'lucide-react';
import './HeartIcon.css';

const HeartIcon = () => {
  return (
    <div className="heart-container">
      <Heart className="heart-icon" fill="#FF0000" stroke="none" />
    </div>
  );
};

export default HeartIcon;
