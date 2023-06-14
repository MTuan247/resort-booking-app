import BInput from '@/components/base/BInput.vue';
import BCheckbox from '@/components/base/BCheckbox.vue';
import BCombobox from '@/components/base/BCombobox.vue';
import BAutocomplete from '@/components/base/BAutocomplete.vue';
import BTextArea from '@/components/base/BTextArea.vue';

export const globalComponent = (app) => {
  app.component('BInput', BInput);
  app.component('BCheckbox', BCheckbox);
  app.component('BCombobox', BCombobox);
  app.component('BAutocomplete', BAutocomplete);
  app.component('BTextArea', BTextArea);
}