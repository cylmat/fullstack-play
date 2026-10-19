import { type PipelineType, type Tensor, type DataArray } from '@huggingface/transformers';
import { FeatureExtractionPipeline, pipeline } from '@huggingface/transformers';

// @doc https://huggingface.co/docs/transformers/index

/**
 * Claude can't generate "embedding models" (vertex) so we use huggingface embedding model instead
 * Hugging face will call https://huggingface.co/<model_name>/resolve/main/config.json (ex: Xenova/all-MiniLM-L6-v2)
 */

const HF_PIPELINE_FEATURE_EXTRACTION: PipelineType = 'feature-extraction';
const DEFAULT_PIPELINE_MODEL = 'distilbert';
const XENOVA_PIPELINE_MODEL = 'Xenova/all-MiniLM-L6-v2';

export default async function embeddingTools(chunkText: string): Promise<DataArray> {
    // Allocate a pipeline for sentiment-analysis or text-classification
    // @doc https://huggingface.co/docs/transformers.js/en/pipelines#available-tasks
    const chunkEmbedder: any = await pipeline(
      HF_PIPELINE_FEATURE_EXTRACTION,
      XENOVA_PIPELINE_MODEL
    ) as FeatureExtractionPipeline
        // Return:
        // TASK: task: 'text-classification',
            // config: _PretrainedConfig {

    const score: Tensor = await chunkEmbedder(chunkText);

    return score.data
}


/* PIPELINE TRANSFORMER //
[Function: closure] TextClassificationPipeline {
  task: 'text-classification',
  model: [Function: closure] DistilBertForSequenceClassification {
    main_input_name: 'input_ids',
    forward_params: [ 'input_ids', 'attention_mask' ],
    _return_dict_in_generate_keys: null,
    config: _PretrainedConfig {
      model_type: 'distilbert',
      is_encoder_decoder: false,
      max_position_embeddings: 512,
      'transformers.js_config': undefined,
      _name_or_path: 'distilbert-base-uncased-finetuned-sst-2-english',
      activation: 'gelu',
      architectures: [Array],
      attention_dropout: 0.1,
      dim: 768,
      dropout: 0.1,
      finetuning_task: 'sst-2',
      hidden_dim: 3072,
      id2label: [Object],
      initializer_range: 0.02,
      label2id: [Object],
      n_heads: 12,
      n_layers: 6,
      output_past: true,
      pad_token_id: 0,
      qa_dropout: 0.1,
      seq_classif_dropout: 0.2,
      sinusoidal_pos_embds: false,
      tie_weights_: true,
      transformers_version: '4.29.2',
      vocab_size: 30522,
      normalized_config: [Object]
    },
    sessions: { model: [InferenceSession] },
    configs: undefined,
    can_generate: false,
    _forward: [AsyncFunction: encoder_forward],
    _prepare_inputs_for_generation: undefined,
    custom_config: {}
  },
  tokenizer: [Function: closure] DistilBertTokenizer {
    return_token_type_ids: false,
    padding_side: 'right',
    _tokenizerJSON: {
      version: '1.0',
      truncation: null,
      padding: null,
      added_tokens: [Array],
      normalizer: [Object],
      pre_tokenizer: [Object],
      post_processor: [Object],
      decoder: [Object],
      model: [Object]
    },
    _tokenizerConfig: {
      clean_up_tokenization_spaces: true,
      cls_token: '[CLS]',
      do_basic_tokenize: true,
      do_lower_case: true,
      mask_token: '[MASK]',
      model_max_length: 512,
      never_split: null,
      pad_token: '[PAD]',
      sep_token: '[SEP]',
      strip_accents: null,
      tokenize_chinese_chars: true,
      tokenizer_class: 'DistilBertTokenizer',
      unk_token: '[UNK]'
    },
    _tokenizer: Tokenizer {
      tokenizer: [Object],
      config: [Object],
      normalizer: [BertNormalizer],
      pre_tokenizer: [BertPreTokenizer],
      model: [WordPieceTokenizer],
      post_processor: [TemplateProcessing],
      decoder: [WordPiece],
      special_tokens: [Array],
      all_special_ids: [Array],
      added_tokens: [Array],
      added_tokens_map: [Map],
      splitter_unnormalized: [DictionarySplitter],
      splitter_normalized: [DictionarySplitter],
      remove_space: undefined,
      clean_up_tokenization_spaces: true,
      do_lowercase_and_remove_accent: false
    },
    config: {
      clean_up_tokenization_spaces: true,
      cls_token: '[CLS]',
      do_basic_tokenize: true,
      do_lower_case: true,
      mask_token: '[MASK]',
      model_max_length: 512,
      never_split: null,
      pad_token: '[PAD]',
      sep_token: '[SEP]',
      strip_accents: null,
      tokenize_chinese_chars: true,
      tokenizer_class: 'DistilBertTokenizer',
      unk_token: '[UNK]'
    },
    mask_token: '[MASK]',
    mask_token_id: 103,
    pad_token: '[PAD]',
    pad_token_id: 0,
    sep_token: '[SEP]',
    sep_token_id: 102,
    unk_token: '[UNK]',
    unk_token_id: 100,
    bos_token: null,
    bos_token_id: undefined,
    eos_token: null,
    eos_token_id: undefined,
    chat_template: null,
    _compiled_template_cache: Map(0) {},
    all_special_ids: [ 0, 100, 101, 102, 103 ],
    all_special_tokens: [ '[PAD]', '[UNK]', '[CLS]', '[SEP]', '[MASK]' ]
  },
  processor: null
}
  */




/* FEATURE EXTRACTION 
Proxy(_Tensor {
  ort_tensor: Tensor {
    cpuData: Float32Array(130176) [
         0.16089166700839996,  -0.22468586266040802,    0.3724112808704376,
        -0.18198521435260773,  0.012999145314097404,  -0.01078835129737854,
        0.035450804978609085,   0.15218088030815125,   0.16191838681697845,
         0.21180665493011475,   -0.1251831352710724,   0.16451983153820038,
        -0.18558895587921143,  -0.07362672686576843,  -0.22133159637451172,
         -0.5461301803588867,   0.04559807851910591,  -0.06375584006309509,
         0.09391777962446213,   0.21567627787590027,   -0.1498512476682663,
         0.07643481343984604,   0.07163849472999573,  0.055688463151454926,
         0.20106516778469086,  -0.07973064482212067,   0.12547902762889862,
           0.235080286860466,    0.0904330164194107,   -0.8548877239227295,
          0.3403889834880829,  0.012946614995598793,  -0.08479447662830353,
        -0.10244164615869522,  0.030152276158332825,   0.11365639418363571,
        -0.09317730367183685,  -0.23089028894901276,  0.029871338978409767,
         0.18749858438968658,  -0.13614338636398315,  -0.31870532035827637,
         0.09966608881950378,   0.42797496914863586,  -0.11423704028129578,
          -0.275890976190567,   -0.3233390748500824,   -0.5442169308662415,
         0.21486979722976685,  -0.07700466364622116,  -0.36410775780677795,
         0.01789269410073757,  -0.24545720219612122,   0.05921388417482376,
          0.0772068127989769,  -0.06616004556417465,    0.2522006034851074,
        -0.10867654532194138,   0.23424378037452698,  -0.48795050382614136,
       -0.007632645312696695,   -0.5034368634223938,  -0.20467418432235718,
        -0.06272856146097183,  -0.07927669584751129, -0.018116850405931473,
       -0.058924704790115356,   0.10393401980400085,  -0.20504586398601532,
         0.03014688566327095,   -0.1728678047657013,     0.131558358669281,
         0.04852945730090141,  -0.12495419383049011,  -0.07114845514297485,
      -0.0036385562270879745,   0.05150023102760315,  -0.20452745258808136,
         0.36653026938438416, -0.025023603811860085,   -0.2692704498767853,
          0.1866539716720581,   -0.3081780970096588,  -0.20209752023220062,
        -0.15361931920051575,   0.12696312367916107,   0.03301512077450752,
         0.10754650831222534,   0.12434256076812744,     0.313109427690506,
       -0.025245893746614456,    0.3087637722492218,   0.08326917141675949,
          0.0445702001452446,   -0.7367538213729858,   0.06329233944416046,
        -0.10551057010889053,  -0.21521329879760742,    0.1183687075972557,
           5.403507709503174,
      ... 130076 more items
    ],
    dataLocation: 'cpu',
    type: 'float32',
    dims: [ 1, 339, 384 ],
    size: 130176
  }
})
  */