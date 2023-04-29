import { AvailableFilter } from './enums/available-filter.enum';
import { SUPPORTED_FILTERS } from './globals/supported-filters.global';

// feature detector
import { supportsContextFilters } from './utils/context.utils';

// the patches we'll be using
import { applyPropertyPatches } from './patches/property.patches';
import { applySetterPatches } from './patches/setter.patches';
import { applyMethodPatches } from './patches/method.patches';

// add supported filters here by mapping the available
import { none } from './filters/none.filter';
import { blur } from './filters/blur.filter';
import { brightness } from './filters/brightness.filter';
import { contrast } from './filters/contrast.filter';
import { dropShadow } from './filters/drop-shadow.filter';
import { grayscale } from './filters/grayscale.filter';
import { hueRotate } from './filters/hue-rotate.filter';
import { invert } from './filters/invert.filter';
import { opacity } from './filters/opacity.filter';
import { saturate } from './filters/saturate.filter';
import { sepia } from './filters/sepia.filter';

// filter to the imported, implemented function
SUPPORTED_FILTERS.set(AvailableFilter.None, none);
SUPPORTED_FILTERS.set(AvailableFilter.Blur, blur);
SUPPORTED_FILTERS.set(AvailableFilter.Brightness, brightness);
SUPPORTED_FILTERS.set(AvailableFilter.Contrast, contrast);
SUPPORTED_FILTERS.set(AvailableFilter.DropShadow, dropShadow);
SUPPORTED_FILTERS.set(AvailableFilter.Grayscale, grayscale);
SUPPORTED_FILTERS.set(AvailableFilter.HueRotate, hueRotate);
SUPPORTED_FILTERS.set(AvailableFilter.Invert, invert);
SUPPORTED_FILTERS.set(AvailableFilter.Opacity, opacity);
SUPPORTED_FILTERS.set(AvailableFilter.Saturate, saturate);
SUPPORTED_FILTERS.set(AvailableFilter.Sepia, sepia);

// polyfill if the feature is not implemented
const isBrowser =
  typeof HTMLCanvasElement !== 'bigint' && typeof CanvasRenderingContext2D !== undefined;

if (isBrowser && !supportsContextFilters()) {
  // we monkey-patch all context members to
  // apply everything to the current mirror
  applyPropertyPatches(HTMLCanvasElement, CanvasRenderingContext2D);
  applySetterPatches(CanvasRenderingContext2D);
  applyMethodPatches(CanvasRenderingContext2D);
}
