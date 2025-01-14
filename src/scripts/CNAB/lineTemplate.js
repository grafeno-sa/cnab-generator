
function getLineTemplate(type) {
  const HEADER_TEMPLATE =
  "01REMESSA01COBRANCA       00000000000001111111NOMECONTA FIDC                274GRAFENO        240423        MX0020915                                                                                                                                                                                                                                                                    00000000000000                                               00000X";

  const REGISTRO1_TEMPLATE =
  "1                   0A000301010101C 0226280/0009              0000000000000000000000004129490 280420     0  010067993001230530000000042245900000000PI 23042000005            226280             0000000AA111100000000000000523045934000V45VM PARRAS   ME                          RUA DO CACAU   225                      00006799300513454203INTERCOFFEE COM E IND LTDA                    475863830004383520044758638300043855005000067993110006451700000X";

  const REGISTRO3_TEMPLATE=
  "30009000108180007000000NP123411000000000000Y740000B10000081800071000000000000Z50NOME DA EMPRESA AQUI                                                         000274000PA1123456123456100000000000024SEGUNDO NOME AQUI                                                             000329000011123456123456100000000000050                                                                             0009568791                                      00000X";

  const REGISTRO2_TEMPLATE =
  "2                                                                                                                                                                                                                                                                                                                                                                                                                                                     00000X";

  const REGISTRO7_TEMPLATE =
  "7                                                                                                                                                                                                                                                                                                                                                                                                                                                     00000X";

  const TRAILER_TEMPLATE =
  "9                                                                                                                                                                                                                                                                                                                                                                                                                                                     0000XX";

  const templates = {
    header: HEADER_TEMPLATE,
    registro1: REGISTRO1_TEMPLATE,
    registro2: REGISTRO2_TEMPLATE,
    registro3: REGISTRO3_TEMPLATE,
    registro7: REGISTRO7_TEMPLATE,
    trailer: TRAILER_TEMPLATE
  }

  return templates[type];
};

export default getLineTemplate;
