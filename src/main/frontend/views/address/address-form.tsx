import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { order: 2, icon: 'line-awesome/svg/map-marker-solid.svg' },
  title: 'Address Form',
  loginRequired: true,
};

export default function AddressFormView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: '200px' }} src="images/empty-plant.png" />
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗</p>
    </div>
  );
}
