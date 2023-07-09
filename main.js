import './assets/styles/style.less';

import { Input } from './components/Input';
import { Select } from './components/Select';
import { Slider } from './components/Slider';
import { TopMenu } from './components/TopMenuValidator';

(function App() {
    TopMenu('.form-login');

    const formSlider = new Slider('#register-form');
    formSlider.init();

    const selectStep = new Select(['#custom-select', '#custom-select-age']);
    selectStep.init();

    const inputStep3 = new Input(['#custom-address', '#custom-email', '#custom-password']);
    inputStep3.init();
})();
