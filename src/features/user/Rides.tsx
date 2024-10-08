import { useTranslation } from 'react-i18next';
import './index.scss';

export default function Rides() {
  const { t, i18n } = useTranslation();

  return (
    <div className='user-view'>
      <h2>{t('User Rides')}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}></div>
    </div>
  );
}
