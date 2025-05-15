
// src/reactjs/introductionPresenter.jsx
import { observer } from "mobx-react-lite";
import { IntroductionView } from "../views/introductionView.jsx";
import { useNavigate } from "react-router-dom";

export const Introduction = observer(function IntroductionPresenter({ model }) {
  const navigate = useNavigate();

 

  function goDaily() {
    navigate(model.currentUser ? "/game" : "/login");
  }

  return (
    <IntroductionView
      onDaily={goDaily}
      user={model.currentUser}
    />
  );
});
