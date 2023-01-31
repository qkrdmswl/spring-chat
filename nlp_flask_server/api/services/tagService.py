from nlp_prod.nlp_main import NlpProcessor

def get_tags(ocrText, init):

    processor = NlpProcessor(ocrText, init)
    tag_list = processor.NLP_Noun(score=True, ner=True)

    tags = []

    for i in range(len(tag_list)):
        tags.append(tag_list[i][0])

    return tags