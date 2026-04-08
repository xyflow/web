import Link from 'next/link';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from '../../ui/select';
import { ProExampleVariant } from './types';

function VariantSelect({
  variants,
  exampleId,
}: {
  exampleId: string;
  variants?: ProExampleVariant[];
}) {
  if (!variants?.length) {
    return null;
  }

  const currentVariant = variants.find((variant) => variant.id === exampleId)!;

  return (
    <Select value={currentVariant.id}>
      <SelectTrigger className="h-[36px] w-[80px] sm:w-auto">
        <div className="overflow-hidden text-ellipsis text-left font-bold">
          <div className="text-xs font-normal text-gray-700">Variant:</div>
          <div className="text-xs">{currentVariant.label}</div>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {variants.map((variant) => (
            <Link href={`/examples/react/${variant.id}`} key={variant.id}>
              <SelectLabel className="px-2 py-1 hover:bg-slate-100">
                {variant.label}
              </SelectLabel>
            </Link>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default VariantSelect;
