import { FC, ReactNode } from 'react';
import { ntDapperFont } from '../../fonts/index';
import { cn } from '../../lib/utils';

export const Html: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: remove this workaround once this is fixed: https://github.com/shuding/nextra/pull/4891
  // const htmlRef = useRef<HTMLHtmlElement>(null);

  // TODO!
  // const [theme, setTheme] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   const html = htmlRef.current;
  //   if (!html) return;

  //   const syncTheme = () => {
  //     const colorScheme = html.style.colorScheme;
  //     setTheme(colorScheme);
  //   };

  //   syncTheme();

  //   const observer = new MutationObserver(syncTheme);
  //   observer.observe(html, {
  //     attributes: true,
  //     attributeFilter: ['style'],
  //   });

  //   return () => observer.disconnect();
  // }, []);

  return (
    <html
      // ref={htmlRef}
      className={cn(ntDapperFont.className)}
      dir="ltr"
      lang="en"
      suppressHydrationWarning
      // data-theme={theme}
    >
      {children}
    </html>
  );
};
