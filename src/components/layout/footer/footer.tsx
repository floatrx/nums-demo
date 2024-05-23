// Styles
import s from './footer.module.scss';

interface IProps {}

export const Footer: FC<IProps> = () => (
  <footer className={s.footer}>
    Nums • 2024, floatrx. Check out the source code and game rules on{' '}
    <a href="https://github.com/floatrx/nums-demo" target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
  </footer>
);
