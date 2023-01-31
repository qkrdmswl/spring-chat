from nlp_prod.nlp_main import NlpProcessor

def get_tags(ocrText, init):
    print("Inside get_tags---")
    print("made processor...")
    processor = NlpProcessor(ocrText, init)
    print("start post processing...")
    processor.post_processing()
    print("Done!")
    tag_list = processor.NLP_Noun(score=True, ner=True)
    print("tag_list: ", tag_list)

    tags = []

    for i in range(len(tag_list)):
        tags.append(tag_list[i][0])

    return tags