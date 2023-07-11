import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'xy-ui';
import { Currency } from './types';

export default function CurrencySelect({
  value = Currency.USD,
  onChange,
}: {
  value: Currency;
  onChange: (val: Currency) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] absolute right-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="usd">$ USD</SelectItem>
        <SelectItem value="eur">€ EUR</SelectItem>
      </SelectContent>
    </Select>
  );
}
