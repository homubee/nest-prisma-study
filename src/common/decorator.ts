import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Page } from "./page";

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dto: DataDto) =>
  applyDecorators(
    ApiExtraModels(Page, dto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(Page) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(dto) },
              },
            },
          },
        ],
      },
    })
  );
