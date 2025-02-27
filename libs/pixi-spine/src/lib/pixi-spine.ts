import '@pixi-spine/loader-base'; // Side effect install atlas loader
import { ISpineResource, SpineLoaderAbstract } from '@pixi-spine/loader-base';
import type { ISkeletonParser, TextureAtlas } from '@pixi-spine/base';
import { AtlasAttachmentLoader, SkeletonData, SkeletonJson } from '@pixi-spine/runtime-3.7';

/**
 * @internal
 */
class SpineParser extends SpineLoaderAbstract<SkeletonData> {
    createBinaryParser(): ISkeletonParser {
      return new SkeletonJson(null!);
    }

    createJsonParser(): ISkeletonParser {
        return new SkeletonJson(null!);
    }

    parseData(parser: ISkeletonParser, atlas: TextureAtlas, dataToParse: any): ISpineResource<SkeletonData> {
        const parserCast = parser as SkeletonJson;

        parserCast.attachmentLoader = new AtlasAttachmentLoader(atlas);

        return {
            spineData: parserCast.readSkeletonData(dataToParse),
            spineAtlas: atlas,
        };
    }
}

new SpineParser().installLoader();
