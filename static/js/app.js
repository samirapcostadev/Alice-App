/* ═══════════════════════════════════════════════════════════
   ALICE — app.js
   Auth: Bearer token via localStorage.
   All API calls → authFetch() adds Authorization header.
   Topics: persistent per-topic chat threads.
═══════════════════════════════════════════════════════════ */


// ── i18n — translations ──────────────────────────────────
const TRANSLATIONS = {
    'pt-br': {
        tab_home: 'Alice', tab_diretorio: 'Diretório', tab_rede: 'Rede', tab_meuspaco: 'Meu Espaço',
        hero_sub: 'Sua companheira de jornada',
        topic_title: 'Sobre o que quer conversar?',
        topic_desabafo: 'Preciso desabafar', topic_amor: 'Amor e vínculos',
        topic_trabalho: 'Trabalho e carreira', topic_familia: 'Família e maternidade',
        topic_conversa: 'Conversa livre', topic_direitos: 'Direitos e apoio',
        topic_label_desabafo: 'Desabafo', topic_label_amor: 'Amor e vínculos',
        topic_label_trabalho: 'Trabalho e carreira', topic_label_familia: 'Família e maternidade',
        topic_label_conversa: 'Conversa livre', topic_label_direitos: 'Direitos e apoio',
        badge_continue: 'continuar',
        checkin_title: 'Como você está hoje?',
        mood_devastada: 'Devastada', mood_triste: 'Triste', mood_confusa: 'Confusa', mood_ok: 'Ok', mood_bem: 'Bem',
        btn_end_topic: 'Encerrar conversa',
        chat_placeholder: 'Escreva sua mensagem...',
        chat_send: 'Enviar mensagem',
        emergency_title: 'Apoio imediato',
        emergency_banner: 'Modo de apoio imediato ativo',
        emergency_btn_title: 'Modo de apoio imediato',
        pilula_title: 'Pílula de acolhimento',
        pilula_loading: 'Carregando…',
        pilula_shuffle: 'Outra pílula',
        card_alice: 'Conversar com Alice', card_directory: 'Diretório', card_directory_sub: 'Profissionais',
        card_rede: 'Rede', card_rede_sub: 'Comunidade',
        card_meuspaco: 'Meu Espaço', card_meuspaco_sub: 'Seus dados',
        card_sos: 'Apoio imediato', card_sos_sub: 'Ajuda agora',
        card_scanner: 'Scanner', card_scanner_sub: 'Análise de texto',
        scanner_title: 'Scanner de Discurso',
        scanner_desc: 'Cole um texto (mensagem, conversa, trecho) e a Alice identifica padrões de gaslighting, machismo e violência simbólica.',
        scanner_analyze: 'Analisar', scanner_loading: 'Alice está analisando…',
        scanner_or_upload: 'Ou anexe uma imagem / arquivo',
        scanner_placeholder: 'Cole aqui o texto que quer analisar…',
        voz_coletiva_label: 'Sentimento da Rede', voz_coletiva_listening: 'Escutando a rede…',
        voz_coletiva_updated: 'atualizado agora',
        insights_title: 'Insights salvos', summaries_title: 'Resumos de conversa',
        voice_title: 'Configurações de voz',
        no_insights: 'Nenhum insight salvo ainda.',
        no_summaries: 'Nenhum resumo ainda.',
        mural: 'Mural', apoio: 'Apoio', servicos: 'Serviços',
        whisper: 'Sussurro',
        onboarding_intro: 'Antes de começarmos, quero te conhecer um pouco.',
        onboarding_placeholder: 'Escreva aqui…',
        btn_back: 'Voltar',
        btn_logout: 'Sair',
        btn_logout_profile: 'Sair da conta',
        safe_exit_title: 'Sair rapidamente',
        nav_main: 'Navegação principal',
        filter_todos: 'Todos', filter_cuidado: 'Cuidado', filter_carreira: 'Carreira',
        filter_vinculos: 'Vínculos', filter_familia: 'Família', filter_autonomia: 'Autonomia', filter_dor: 'Dor',
        filter_geral: 'Geral',
        mural_empty: 'A comunidade aguarda a tua voz.',
        mural_empty_sub: 'Sê a primeira a partilhar.',
        mural_anon_name: 'Mulher anónima',
        composer_mural_title: 'Nova partilha',
        composer_anon_label: 'Anónima',
        composer_mural_placeholder: 'O que queres partilhar?',
        composer_mural_submit: 'Partilhar',
        composer_apoio_title: 'Novo card de apoio',
        composer_apoio_need: 'Preciso de apoio',
        composer_apoio_offer: 'Posso ajudar',
        composer_apoio_title_placeholder: 'Título (ex: Preciso de companhia para consulta)',
        composer_apoio_cat_label: 'Categoria',
        composer_apoio_desc_placeholder: 'Descreve o que precisas ou como podes ajudar…',
        composer_apoio_submit: 'Publicar',
        apoio_cat_acompanhamento: 'Acompanhamento', apoio_cat_transporte: 'Transporte',
        apoio_cat_criancas: 'Crianças', apoio_cat_juridico: 'Jurídico',
        apoio_cat_grupo: 'Grupo', apoio_cat_trabalho: 'Trabalho',
        apoio_city_placeholder: 'Filtrar por cidade…',
        apoio_requests_title: 'Pedidos de conexão',
        apoio_empty: 'Ainda não há cards de apoio.',
        apoio_empty_sub: 'Crie o primeiro!',
        apoio_connect: 'Conectar',
        apoio_badge_need: 'Preciso de apoio', apoio_badge_offer: 'Posso ajudar',
        servicos_emprego: 'Emprego', servicos_formacao: 'Formação',
        servicos_empreender: 'Empreender', servicos_voluntariado: 'Voluntariado',
        dir_title: 'Rede de Saída',
        dir_desc: 'Profissionais mulheres selecionadas para te apoiar — advogadas, psicólogas e assistentes sociais.',
        dir_badge: 'Em desenvolvimento',
        dir_todas: 'Todas', dir_advogadas: 'Advogadas', dir_psicologas: 'Psicólogas', dir_assistente: 'Assist. Social',
        dir_loc_todas: 'Todas',
        profile_stat_messages: 'mensagens', profile_stat_insights: 'insights', profile_stat_since: 'membro desde',
        profile_bio_label: 'Bio', profile_bio_empty: 'Sem bio ainda.',
        profile_insights_empty: 'Nenhum insight guardado ainda.',
        profile_insights_empty_sub: 'Toque no marcador em mensagens da Alice para salvar.',
        profile_edit_title: 'Editar perfil',
        profile_edit_name: 'Nome', profile_edit_name_placeholder: 'Seu nome completo',
        profile_edit_bio: 'Bio', profile_edit_bio_placeholder: 'Conte um pouco sobre você…',
        profile_save: 'Salvar',
        voice_enabled: 'Voz ativada', voice_profile_label: 'Perfil vocal',
        voice_acolhedora: 'Acolhedora', voice_firme: 'Firme', voice_neutra: 'Neutra',
        voice_speed: 'Velocidade', voice_whisper_mode: 'Modo sussurro',
        toast_checkin: 'Anotado. Aqui pra você 💛',
        toast_conversation_saved: 'Conversa salva. Continue quando quiser.',
        toast_profile_updated: 'Perfil atualizado!',
        toast_photo_updated: 'Foto atualizada!',
        toast_scanner_min: 'Cole um texto com pelo menos 20 caracteres.',
        toast_error_scanner: 'Erro ao conectar com a Alice.',
        toast_error_profile: 'Erro ao carregar perfil.',
        toast_error_photo: 'Erro ao enviar foto.',
        toast_error_photo_size: 'Imagem muito grande (máx. 2MB).',
        toast_file_unsupported: 'Tipo de arquivo não suportado.',
        toast_file_too_large: 'Arquivo muito grande (máx. 5MB).',
        toast_max_files: 'Máximo de 10 arquivos por envio.',
        chat_attach: 'Anexar arquivo',
        toast_error_publish: 'Erro ao publicar.',
        toast_error_network: 'Erro de rede.',
        toast_fill_title: 'Preenche o título.',
        toast_name_required: 'O nome não pode estar vazio.',
        composer_mural_empty: 'Escreva algo para partilhar.',
        composer_name_label: 'Com o meu nome',
        servicos_empty: 'Nenhum serviço encontrado.',
        talk_with_alice: 'Conversar com Alice',
        dir_loc_brazil: 'Brasil',
        dir_loc_portugal: 'Portugal',
        btn_listen: 'Ouvir mensagem',
        btn_save_insight: 'Guardar insight',
        alice_fallback: 'Estou aqui. Pode começar.',
        alice_error: 'Algo deu errado. Pode tentar de novo?',
        toast_generating_summary: 'Gerando resumo…',
        toast_summary_saved: 'Resumo salvo no seu perfil!',
        toast_chat_ended: 'Conversa encerrada.',
        toast_insight_error: 'Erro ao guardar.',
        toast_published: 'Partilhado com a comunidade.',
        toast_apoio_published: 'Card de apoio publicado.',
        toast_scanner_error: 'Erro na análise.',
        reaction_abraco: 'Estou contigo',
        reaction_forca: 'Força',
        reaction_identifico: 'Me identifico',
        toast_insight_saved: 'Insight guardado!',
        onboarding_photo_title: 'Vamos colocar um rosto no nome',
        onboarding_photo_subtitle: 'Escolha uma foto que mostre quem você é de verdade',
        onboarding_photo_take: 'Tirar Foto',
        onboarding_photo_gallery: 'Escolher da Galeria',
        onboarding_photo_skip: 'Pular',
        onboarding_photo_confirm: 'Usar esta foto',
        onboarding_photo_retake: 'Escolher outra'
    },
    'pt-pt': {
        tab_home: 'Alice', tab_diretorio: 'Diretório', tab_rede: 'Rede', tab_meuspaco: 'Meu Espaço',
        hero_sub: 'A tua companheira de jornada',
        topic_title: 'Sobre o que queres conversar?',
        topic_desabafo: 'Preciso desabafar', topic_amor: 'Amor e vínculos',
        topic_trabalho: 'Trabalho e carreira', topic_familia: 'Família e maternidade',
        topic_conversa: 'Conversa livre', topic_direitos: 'Direitos e apoio',
        topic_label_desabafo: 'Desabafo', topic_label_amor: 'Amor e vínculos',
        topic_label_trabalho: 'Trabalho e carreira', topic_label_familia: 'Família e maternidade',
        topic_label_conversa: 'Conversa livre', topic_label_direitos: 'Direitos e apoio',
        badge_continue: 'continuar',
        checkin_title: 'Como estás hoje?',
        mood_devastada: 'Devastada', mood_triste: 'Triste', mood_confusa: 'Confusa', mood_ok: 'Ok', mood_bem: 'Bem',
        btn_end_topic: 'Encerrar conversa',
        chat_placeholder: 'Escreve a tua mensagem...',
        chat_send: 'Enviar mensagem',
        emergency_title: 'Apoio imediato',
        emergency_banner: 'Modo de apoio imediato ativo',
        emergency_btn_title: 'Modo de apoio imediato',
        pilula_title: 'Pílula de acolhimento',
        pilula_loading: 'A carregar…',
        pilula_shuffle: 'Outra pílula',
        card_alice: 'Conversar com Alice', card_directory: 'Diretório', card_directory_sub: 'Profissionais',
        card_rede: 'Rede', card_rede_sub: 'Comunidade',
        card_meuspaco: 'Meu Espaço', card_meuspaco_sub: 'Os teus dados',
        card_sos: 'Apoio imediato', card_sos_sub: 'Ajuda agora',
        card_scanner: 'Scanner', card_scanner_sub: 'Análise de texto',
        scanner_title: 'Scanner de Discurso',
        scanner_desc: 'Cola um texto (mensagem, conversa, trecho) e a Alice identifica padrões de gaslighting, machismo e violência simbólica.',
        scanner_analyze: 'Analisar', scanner_loading: 'A Alice está a analisar…',
        scanner_or_upload: 'Ou anexa uma imagem / ficheiro',
        scanner_placeholder: 'Cola aqui o texto que queres analisar…',
        voz_coletiva_label: 'Sentimento da Rede', voz_coletiva_listening: 'A escutar a rede…',
        voz_coletiva_updated: 'atualizado agora',
        insights_title: 'Insights guardados', summaries_title: 'Resumos de conversa',
        voice_title: 'Configurações de voz',
        no_insights: 'Nenhum insight guardado ainda.',
        no_summaries: 'Nenhum resumo ainda.',
        mural: 'Mural', apoio: 'Apoio', servicos: 'Serviços',
        whisper: 'Sussurro',
        onboarding_intro: 'Antes de começarmos, quero conhecer-te um pouco.',
        onboarding_placeholder: 'Escreve aqui…',
        btn_back: 'Voltar',
        btn_logout: 'Sair',
        btn_logout_profile: 'Sair da conta',
        safe_exit_title: 'Sair rapidamente',
        nav_main: 'Navegação principal',
        filter_todos: 'Todos', filter_cuidado: 'Cuidado', filter_carreira: 'Carreira',
        filter_vinculos: 'Vínculos', filter_familia: 'Família', filter_autonomia: 'Autonomia', filter_dor: 'Dor',
        filter_geral: 'Geral',
        mural_empty: 'A comunidade aguarda a tua voz.',
        mural_empty_sub: 'Sê a primeira a partilhar.',
        mural_anon_name: 'Mulher anónima',
        composer_mural_title: 'Nova partilha',
        composer_anon_label: 'Anónima',
        composer_mural_placeholder: 'O que queres partilhar?',
        composer_mural_submit: 'Partilhar',
        composer_apoio_title: 'Novo card de apoio',
        composer_apoio_need: 'Preciso de apoio',
        composer_apoio_offer: 'Posso ajudar',
        composer_apoio_title_placeholder: 'Título (ex: Preciso de companhia para consulta)',
        composer_apoio_cat_label: 'Categoria',
        composer_apoio_desc_placeholder: 'Descreve o que precisas ou como podes ajudar…',
        composer_apoio_submit: 'Publicar',
        apoio_cat_acompanhamento: 'Acompanhamento', apoio_cat_transporte: 'Transporte',
        apoio_cat_criancas: 'Crianças', apoio_cat_juridico: 'Jurídico',
        apoio_cat_grupo: 'Grupo', apoio_cat_trabalho: 'Trabalho',
        apoio_city_placeholder: 'Filtrar por cidade…',
        apoio_requests_title: 'Pedidos de conexão',
        apoio_empty: 'Ainda não há cards de apoio.',
        apoio_empty_sub: 'Cria o primeiro!',
        apoio_connect: 'Conectar',
        apoio_badge_need: 'Preciso de apoio', apoio_badge_offer: 'Posso ajudar',
        servicos_emprego: 'Emprego', servicos_formacao: 'Formação',
        servicos_empreender: 'Empreender', servicos_voluntariado: 'Voluntariado',
        dir_title: 'Rede de Saída',
        dir_desc: 'Profissionais mulheres selecionadas para te apoiar — advogadas, psicólogas e assistentes sociais.',
        dir_badge: 'Em desenvolvimento',
        dir_todas: 'Todas', dir_advogadas: 'Advogadas', dir_psicologas: 'Psicólogas', dir_assistente: 'Assist. Social',
        dir_loc_todas: 'Todas',
        profile_stat_messages: 'mensagens', profile_stat_insights: 'insights', profile_stat_since: 'membro desde',
        profile_bio_label: 'Bio', profile_bio_empty: 'Sem bio ainda.',
        profile_insights_empty: 'Nenhum insight guardado ainda.',
        profile_insights_empty_sub: 'Toca no marcador em mensagens da Alice para guardar.',
        profile_edit_title: 'Editar perfil',
        profile_edit_name: 'Nome', profile_edit_name_placeholder: 'O teu nome completo',
        profile_edit_bio: 'Bio', profile_edit_bio_placeholder: 'Conta um pouco sobre ti…',
        profile_save: 'Guardar',
        voice_enabled: 'Voz ativada', voice_profile_label: 'Perfil vocal',
        voice_acolhedora: 'Acolhedora', voice_firme: 'Firme', voice_neutra: 'Neutra',
        voice_speed: 'Velocidade', voice_whisper_mode: 'Modo sussurro',
        toast_checkin: 'Anotado. Aqui para ti 💛',
        toast_conversation_saved: 'Conversa guardada. Continua quando quiseres.',
        toast_profile_updated: 'Perfil atualizado!',
        toast_photo_updated: 'Foto atualizada!',
        toast_scanner_min: 'Cola um texto com pelo menos 20 caracteres.',
        toast_error_scanner: 'Erro ao conectar com a Alice.',
        toast_error_profile: 'Erro ao carregar perfil.',
        toast_error_photo: 'Erro ao enviar foto.',
        toast_error_photo_size: 'Imagem muito grande (máx. 2MB).',
        toast_file_unsupported: 'Tipo de ficheiro não suportado.',
        toast_file_too_large: 'Ficheiro muito grande (máx. 5MB).',
        toast_max_files: 'Máximo de 10 ficheiros por envio.',
        chat_attach: 'Anexar ficheiro',
        toast_error_publish: 'Erro ao publicar.',
        toast_error_network: 'Erro de rede.',
        toast_fill_title: 'Preenche o título.',
        toast_name_required: 'O nome não pode estar vazio.',
        composer_mural_empty: 'Escreve algo para partilhar.',
        composer_name_label: 'Com o meu nome',
        servicos_empty: 'Nenhum serviço encontrado.',
        talk_with_alice: 'Conversar com Alice',
        dir_loc_brazil: 'Brasil',
        dir_loc_portugal: 'Portugal',
        btn_listen: 'Ouvir mensagem',
        btn_save_insight: 'Guardar insight',
        alice_fallback: 'Estou aqui. Pode começar.',
        alice_error: 'Algo correu mal. Pode tentar de novo?',
        toast_generating_summary: 'A gerar resumo…',
        toast_summary_saved: 'Resumo guardado no teu perfil!',
        toast_chat_ended: 'Conversa terminada.',
        toast_insight_error: 'Erro ao guardar.',
        toast_published: 'Partilhado com a comunidade.',
        toast_apoio_published: 'Card de apoio publicado.',
        toast_scanner_error: 'Erro na análise.',
        reaction_abraco: 'Estou contigo',
        reaction_forca: 'Força',
        reaction_identifico: 'Identifico-me',
        toast_insight_saved: 'Insight guardado!',
        onboarding_photo_title: 'Vamos pôr um rosto no nome',
        onboarding_photo_subtitle: 'Escolhe uma foto que mostre quem és de verdade',
        onboarding_photo_take: 'Tirar Foto',
        onboarding_photo_gallery: 'Escolher da Galeria',
        onboarding_photo_skip: 'Saltar',
        onboarding_photo_confirm: 'Usar esta foto',
        onboarding_photo_retake: 'Escolher outra'
    },
    'es': {
        tab_home: 'Alice', tab_diretorio: 'Directorio', tab_rede: 'Red', tab_meuspaco: 'Mi Espacio',
        hero_sub: 'Tu compañera de viaje',
        topic_title: '¿De qué quieres hablar?',
        topic_desabafo: 'Necesito desahogarme', topic_amor: 'Amor y vínculos',
        topic_trabalho: 'Trabajo y carrera', topic_familia: 'Familia y maternidad',
        topic_conversa: 'Conversación libre', topic_direitos: 'Derechos y apoyo',
        topic_label_desabafo: 'Desahogo', topic_label_amor: 'Amor y vínculos',
        topic_label_trabalho: 'Trabajo y carrera', topic_label_familia: 'Familia y maternidad',
        topic_label_conversa: 'Conversación libre', topic_label_direitos: 'Derechos y apoyo',
        badge_continue: 'continuar',
        checkin_title: '¿Cómo estás hoy?',
        mood_devastada: 'Devastada', mood_triste: 'Triste', mood_confusa: 'Confusa', mood_ok: 'Ok', mood_bem: 'Bien',
        btn_end_topic: 'Terminar conversación',
        chat_placeholder: 'Escribe tu mensaje...',
        chat_send: 'Enviar mensaje',
        emergency_title: 'Apoyo inmediato',
        emergency_banner: 'Modo de apoyo inmediato activo',
        emergency_btn_title: 'Modo de apoyo inmediato',
        pilula_title: 'Píldora de acogida',
        pilula_loading: 'Cargando…',
        pilula_shuffle: 'Otra píldora',
        card_alice: 'Hablar con Alice', card_directory: 'Directorio', card_directory_sub: 'Profesionales',
        card_rede: 'Red', card_rede_sub: 'Comunidad',
        card_meuspaco: 'Mi Espacio', card_meuspaco_sub: 'Tus datos',
        card_sos: 'Apoyo inmediato', card_sos_sub: 'Ayuda ahora',
        card_scanner: 'Scanner', card_scanner_sub: 'Análisis de texto',
        scanner_title: 'Scanner de Discurso',
        scanner_desc: 'Pega un texto (mensaje, conversación, fragmento) y Alice identifica patrones de gaslighting, machismo y violencia simbólica.',
        scanner_analyze: 'Analizar', scanner_loading: 'Alice está analizando…',
        scanner_or_upload: 'O adjunta una imagen / archivo',
        scanner_placeholder: 'Pega aquí el texto que quieres analizar…',
        voz_coletiva_label: 'Sentimiento de la Red', voz_coletiva_listening: 'Escuchando la red…',
        voz_coletiva_updated: 'actualizado ahora',
        insights_title: 'Insights guardados', summaries_title: 'Resúmenes de conversación',
        voice_title: 'Configuración de voz',
        no_insights: 'Ningún insight guardado aún.',
        no_summaries: 'Ningún resumen aún.',
        mural: 'Mural', apoio: 'Apoyo', servicos: 'Servicios',
        whisper: 'Susurro',
        onboarding_intro: 'Antes de empezar, quiero conocerte un poco.',
        onboarding_placeholder: 'Escribe aquí…',
        btn_back: 'Volver',
        btn_logout: 'Salir',
        btn_logout_profile: 'Cerrar sesión',
        safe_exit_title: 'Salir rápidamente',
        nav_main: 'Navegación principal',
        filter_todos: 'Todos', filter_cuidado: 'Cuidado', filter_carreira: 'Carrera',
        filter_vinculos: 'Vínculos', filter_familia: 'Familia', filter_autonomia: 'Autonomía', filter_dor: 'Dolor',
        filter_geral: 'General',
        mural_empty: 'La comunidad espera tu voz.',
        mural_empty_sub: 'Sé la primera en compartir.',
        mural_anon_name: 'Mujer anónima',
        composer_mural_title: 'Nueva publicación',
        composer_anon_label: 'Anónima',
        composer_mural_placeholder: '¿Qué quieres compartir?',
        composer_mural_submit: 'Compartir',
        composer_apoio_title: 'Nuevo card de apoyo',
        composer_apoio_need: 'Necesito apoyo',
        composer_apoio_offer: 'Puedo ayudar',
        composer_apoio_title_placeholder: 'Título (ej: Necesito compañía para consulta)',
        composer_apoio_cat_label: 'Categoría',
        composer_apoio_desc_placeholder: 'Describe lo que necesitas o cómo puedes ayudar…',
        composer_apoio_submit: 'Publicar',
        apoio_cat_acompanhamento: 'Acompañamiento', apoio_cat_transporte: 'Transporte',
        apoio_cat_criancas: 'Niños/as', apoio_cat_juridico: 'Jurídico',
        apoio_cat_grupo: 'Grupo', apoio_cat_trabalho: 'Trabajo',
        apoio_city_placeholder: 'Filtrar por ciudad…',
        apoio_requests_title: 'Solicitudes de conexión',
        apoio_empty: 'Aún no hay cards de apoyo.',
        apoio_empty_sub: '¡Crea el primero!',
        apoio_connect: 'Conectar',
        apoio_badge_need: 'Necesito apoyo', apoio_badge_offer: 'Puedo ayudar',
        servicos_emprego: 'Empleo', servicos_formacao: 'Formación',
        servicos_empreender: 'Emprender', servicos_voluntariado: 'Voluntariado',
        dir_title: 'Red de Salida',
        dir_desc: 'Profesionales mujeres seleccionadas para apoyarte — abogadas, psicólogas y trabajadoras sociales.',
        dir_badge: 'En desarrollo',
        dir_todas: 'Todas', dir_advogadas: 'Abogadas', dir_psicologas: 'Psicólogas', dir_assistente: 'Trab. Social',
        dir_loc_todas: 'Todas',
        profile_stat_messages: 'mensajes', profile_stat_insights: 'insights', profile_stat_since: 'miembro desde',
        profile_bio_label: 'Bio', profile_bio_empty: 'Sin bio aún.',
        profile_insights_empty: 'Ningún insight guardado aún.',
        profile_insights_empty_sub: 'Toca el marcador en mensajes de Alice para guardar.',
        profile_edit_title: 'Editar perfil',
        profile_edit_name: 'Nombre', profile_edit_name_placeholder: 'Tu nombre completo',
        profile_edit_bio: 'Bio', profile_edit_bio_placeholder: 'Cuéntanos un poco sobre ti…',
        profile_save: 'Guardar',
        voice_enabled: 'Voz activada', voice_profile_label: 'Perfil vocal',
        voice_acolhedora: 'Acogedora', voice_firme: 'Firme', voice_neutra: 'Neutra',
        voice_speed: 'Velocidad', voice_whisper_mode: 'Modo susurro',
        toast_checkin: 'Anotado. Aquí para ti 💛',
        toast_conversation_saved: 'Conversación guardada. Continúa cuando quieras.',
        toast_profile_updated: '¡Perfil actualizado!',
        toast_photo_updated: '¡Foto actualizada!',
        toast_scanner_min: 'Pega un texto con al menos 20 caracteres.',
        toast_error_scanner: 'Error al conectar con Alice.',
        toast_error_profile: 'Error al cargar perfil.',
        toast_error_photo: 'Error al enviar foto.',
        toast_error_photo_size: 'Imagen demasiado grande (máx. 2MB).',
        toast_file_unsupported: 'Tipo de archivo no soportado.',
        toast_file_too_large: 'Archivo demasiado grande (máx. 5MB).',
        toast_max_files: 'Máximo de 10 archivos por envío.',
        chat_attach: 'Adjuntar archivo',
        toast_error_publish: 'Error al publicar.',
        toast_error_network: 'Error de red.',
        toast_fill_title: 'Rellena el título.',
        toast_name_required: 'El nombre no puede estar vacío.',
        composer_mural_empty: 'Escribe algo para compartir.',
        composer_name_label: 'Con mi nombre',
        servicos_empty: 'Ningún servicio encontrado.',
        talk_with_alice: 'Hablar con Alice',
        dir_loc_brazil: 'Brasil',
        dir_loc_portugal: 'Portugal',
        btn_listen: 'Escuchar mensaje',
        btn_save_insight: 'Guardar reflexión',
        alice_fallback: 'Estoy aquí. Puedes empezar.',
        alice_error: 'Algo salió mal. ¿Puedes intentar de nuevo?',
        toast_generating_summary: 'Generando resumen…',
        toast_summary_saved: '¡Resumen guardado en tu perfil!',
        toast_chat_ended: 'Conversación terminada.',
        toast_insight_error: 'Error al guardar.',
        toast_published: 'Compartido con la comunidad.',
        toast_apoio_published: 'Tarjeta de apoyo publicada.',
        toast_scanner_error: 'Error en el análisis.',
        reaction_abraco: 'Estoy contigo',
        reaction_forca: 'Fuerza',
        reaction_identifico: 'Me identifico',
        toast_insight_saved: '¡Reflexión guardada!',
        onboarding_photo_title: 'Pongamos un rostro al nombre',
        onboarding_photo_subtitle: 'Elige una foto que muestre quién eres de verdad',
        onboarding_photo_take: 'Tomar Foto',
        onboarding_photo_gallery: 'Elegir de la Galería',
        onboarding_photo_skip: 'Omitir',
        onboarding_photo_confirm: 'Usar esta foto',
        onboarding_photo_retake: 'Elegir otra'
    },
    'en': {
        tab_home: 'Alice', tab_diretorio: 'Directory', tab_rede: 'Network', tab_meuspaco: 'My Space',
        hero_sub: 'Your journey companion',
        topic_title: 'What would you like to talk about?',
        topic_desabafo: 'I need to vent', topic_amor: 'Love & bonds',
        topic_trabalho: 'Work & career', topic_familia: 'Family & motherhood',
        topic_conversa: 'Free conversation', topic_direitos: 'Rights & support',
        topic_label_desabafo: 'Venting', topic_label_amor: 'Love & bonds',
        topic_label_trabalho: 'Work & career', topic_label_familia: 'Family & motherhood',
        topic_label_conversa: 'Free conversation', topic_label_direitos: 'Rights & support',
        badge_continue: 'continue',
        checkin_title: 'How are you today?',
        mood_devastada: 'Devastated', mood_triste: 'Sad', mood_confusa: 'Confused', mood_ok: 'Ok', mood_bem: 'Good',
        btn_end_topic: 'End conversation',
        chat_placeholder: 'Write your message...',
        chat_send: 'Send message',
        emergency_title: 'Immediate support',
        emergency_banner: 'Immediate support mode active',
        emergency_btn_title: 'Immediate support mode',
        pilula_title: 'Comfort quote',
        pilula_loading: 'Loading…',
        pilula_shuffle: 'Another quote',
        card_alice: 'Talk to Alice', card_directory: 'Directory', card_directory_sub: 'Professionals',
        card_rede: 'Network', card_rede_sub: 'Community',
        card_meuspaco: 'My Space', card_meuspaco_sub: 'Your data',
        card_sos: 'Immediate support', card_sos_sub: 'Help now',
        card_scanner: 'Scanner', card_scanner_sub: 'Text analysis',
        scanner_title: 'Discourse Scanner',
        scanner_desc: 'Paste a text (message, conversation, excerpt) and Alice will identify patterns of gaslighting, sexism, and symbolic violence.',
        scanner_analyze: 'Analyze', scanner_loading: 'Alice is analyzing…',
        scanner_or_upload: 'Or attach an image / file',
        scanner_placeholder: 'Paste the text you want to analyze here…',
        voz_coletiva_label: 'Network Sentiment', voz_coletiva_listening: 'Listening to the network…',
        voz_coletiva_updated: 'updated now',
        insights_title: 'Saved insights', summaries_title: 'Conversation summaries',
        voice_title: 'Voice settings',
        no_insights: 'No insights saved yet.',
        no_summaries: 'No summaries yet.',
        mural: 'Feed', apoio: 'Support', servicos: 'Services',
        whisper: 'Whisper',
        onboarding_intro: 'Before we start, I want to get to know you a little.',
        onboarding_placeholder: 'Write here…',
        btn_back: 'Back',
        btn_logout: 'Logout',
        btn_logout_profile: 'Sign out',
        safe_exit_title: 'Quick exit',
        nav_main: 'Main navigation',
        filter_todos: 'All', filter_cuidado: 'Care', filter_carreira: 'Career',
        filter_vinculos: 'Bonds', filter_familia: 'Family', filter_autonomia: 'Autonomy', filter_dor: 'Pain',
        filter_geral: 'General',
        mural_empty: 'The community awaits your voice.',
        mural_empty_sub: 'Be the first to share.',
        mural_anon_name: 'Anonymous woman',
        composer_mural_title: 'New post',
        composer_anon_label: 'Anonymous',
        composer_mural_placeholder: 'What would you like to share?',
        composer_mural_submit: 'Share',
        composer_apoio_title: 'New support card',
        composer_apoio_need: 'I need support',
        composer_apoio_offer: 'I can help',
        composer_apoio_title_placeholder: 'Title (e.g.: I need company for a medical appointment)',
        composer_apoio_cat_label: 'Category',
        composer_apoio_desc_placeholder: 'Describe what you need or how you can help…',
        composer_apoio_submit: 'Publish',
        apoio_cat_acompanhamento: 'Companionship', apoio_cat_transporte: 'Transport',
        apoio_cat_criancas: 'Childcare', apoio_cat_juridico: 'Legal',
        apoio_cat_grupo: 'Group', apoio_cat_trabalho: 'Work',
        apoio_city_placeholder: 'Filter by city…',
        apoio_requests_title: 'Connection requests',
        apoio_empty: 'No support cards yet.',
        apoio_empty_sub: 'Create the first one!',
        apoio_connect: 'Connect',
        apoio_badge_need: 'Needs support', apoio_badge_offer: 'Can help',
        servicos_emprego: 'Jobs', servicos_formacao: 'Training',
        servicos_empreender: 'Entrepreneurship', servicos_voluntariado: 'Volunteering',
        dir_title: 'Exit Network',
        dir_desc: 'Selected women professionals to support you — lawyers, psychologists, and social workers.',
        dir_badge: 'In development',
        dir_todas: 'All', dir_advogadas: 'Lawyers', dir_psicologas: 'Psychologists', dir_assistente: 'Social Workers',
        dir_loc_todas: 'All',
        profile_stat_messages: 'messages', profile_stat_insights: 'insights', profile_stat_since: 'member since',
        profile_bio_label: 'Bio', profile_bio_empty: 'No bio yet.',
        profile_insights_empty: 'No insights saved yet.',
        profile_insights_empty_sub: 'Tap the bookmark on Alice\'s messages to save.',
        profile_edit_title: 'Edit profile',
        profile_edit_name: 'Name', profile_edit_name_placeholder: 'Your full name',
        profile_edit_bio: 'Bio', profile_edit_bio_placeholder: 'Tell us a little about yourself…',
        profile_save: 'Save',
        voice_enabled: 'Voice enabled', voice_profile_label: 'Voice profile',
        voice_acolhedora: 'Warm', voice_firme: 'Firm', voice_neutra: 'Neutral',
        voice_speed: 'Speed', voice_whisper_mode: 'Whisper mode',
        toast_checkin: 'Noted. Here for you 💛',
        toast_conversation_saved: 'Conversation saved. Continue whenever you want.',
        toast_profile_updated: 'Profile updated!',
        toast_photo_updated: 'Photo updated!',
        toast_scanner_min: 'Paste a text with at least 20 characters.',
        toast_error_scanner: 'Error connecting to Alice.',
        toast_error_profile: 'Error loading profile.',
        toast_error_photo: 'Error uploading photo.',
        toast_error_photo_size: 'Image too large (max 2MB).',
        toast_file_unsupported: 'Unsupported file type.',
        toast_file_too_large: 'File too large (max 5MB).',
        toast_max_files: 'Maximum 10 files per upload.',
        chat_attach: 'Attach file',
        toast_error_publish: 'Error publishing.',
        toast_error_network: 'Network error.',
        toast_fill_title: 'Please fill in the title.',
        toast_name_required: 'Name cannot be empty.',
        composer_mural_empty: 'Write something to share.',
        composer_name_label: 'With my name',
        servicos_empty: 'No services found.',
        talk_with_alice: 'Talk to Alice',
        dir_loc_brazil: 'Brazil',
        dir_loc_portugal: 'Portugal',
        btn_listen: 'Listen to message',
        btn_save_insight: 'Save insight',
        alice_fallback: 'I\'m here. You can start.',
        alice_error: 'Something went wrong. Can you try again?',
        toast_generating_summary: 'Generating summary…',
        toast_summary_saved: 'Summary saved to your profile!',
        toast_chat_ended: 'Conversation ended.',
        toast_insight_error: 'Error saving.',
        toast_published: 'Shared with the community.',
        toast_apoio_published: 'Support card published.',
        toast_scanner_error: 'Analysis error.',
        reaction_abraco: 'I\'m with you',
        reaction_forca: 'Strength',
        reaction_identifico: 'I relate',
        toast_insight_saved: 'Insight saved!',
        onboarding_photo_title: "Let's put a face to the name",
        onboarding_photo_subtitle: 'Choose a photo that shows who you really are',
        onboarding_photo_take: 'Take Photo',
        onboarding_photo_gallery: 'Choose from Gallery',
        onboarding_photo_skip: 'Skip',
        onboarding_photo_confirm: 'Use this photo',
        onboarding_photo_retake: 'Choose another'
    },
    'fr': {
        tab_home: 'Alice', tab_diretorio: 'Répertoire', tab_rede: 'Réseau', tab_meuspaco: 'Mon Espace',
        hero_sub: 'Ta compagne de parcours',
        topic_title: 'De quoi veux-tu parler ?',
        topic_desabafo: "J'ai besoin de parler", topic_amor: 'Amour et liens',
        topic_trabalho: 'Travail et carrière', topic_familia: 'Famille et maternité',
        topic_conversa: 'Conversation libre', topic_direitos: 'Droits et soutien',
        topic_label_desabafo: 'Se confier', topic_label_amor: 'Amour et liens',
        topic_label_trabalho: 'Travail et carrière', topic_label_familia: 'Famille et maternité',
        topic_label_conversa: 'Conversation libre', topic_label_direitos: 'Droits et soutien',
        badge_continue: 'continuer',
        checkin_title: 'Comment vas-tu aujourd\'hui ?',
        mood_devastada: 'Dévastée', mood_triste: 'Triste', mood_confusa: 'Confuse', mood_ok: 'Ok', mood_bem: 'Bien',
        btn_end_topic: 'Terminer la conversation',
        chat_placeholder: 'Écris ton message...',
        chat_send: 'Envoyer le message',
        emergency_title: 'Soutien immédiat',
        emergency_banner: 'Mode de soutien immédiat actif',
        emergency_btn_title: 'Mode de soutien immédiat',
        pilula_title: 'Pensée réconfortante',
        pilula_loading: 'Chargement…',
        pilula_shuffle: 'Autre pensée',
        card_alice: 'Parler avec Alice', card_directory: 'Répertoire', card_directory_sub: 'Professionnels',
        card_rede: 'Réseau', card_rede_sub: 'Communauté',
        card_meuspaco: 'Mon Espace', card_meuspaco_sub: 'Tes données',
        card_sos: 'Soutien immédiat', card_sos_sub: 'Aide maintenant',
        card_scanner: 'Scanner', card_scanner_sub: 'Analyse de texte',
        scanner_title: 'Scanner de Discours',
        scanner_desc: 'Colle un texte (message, conversation, extrait) et Alice identifiera les schémas de gaslighting, machisme et violence symbolique.',
        scanner_analyze: 'Analyser', scanner_loading: 'Alice analyse…',
        scanner_or_upload: 'Ou joindre une image / fichier',
        scanner_placeholder: 'Colle ici le texte que tu veux analyser…',
        voz_coletiva_label: 'Sentiment du Réseau', voz_coletiva_listening: 'À l\'écoute du réseau…',
        voz_coletiva_updated: 'mis à jour maintenant',
        insights_title: 'Insights sauvegardés', summaries_title: 'Résumés de conversation',
        voice_title: 'Paramètres vocaux',
        no_insights: 'Aucun insight sauvegardé.',
        no_summaries: 'Aucun résumé pour le moment.',
        mural: 'Fil', apoio: 'Soutien', servicos: 'Services',
        whisper: 'Chuchoter',
        onboarding_intro: 'Avant de commencer, je veux te connaître un peu.',
        onboarding_placeholder: 'Écris ici…',
        btn_back: 'Retour',
        btn_logout: 'Déconnexion',
        btn_logout_profile: 'Se déconnecter',
        safe_exit_title: 'Sortir rapidement',
        nav_main: 'Navigation principale',
        filter_todos: 'Tous', filter_cuidado: 'Soin', filter_carreira: 'Carrière',
        filter_vinculos: 'Liens', filter_familia: 'Famille', filter_autonomia: 'Autonomie', filter_dor: 'Douleur',
        filter_geral: 'Général',
        mural_empty: 'La communauté attend ta voix.',
        mural_empty_sub: 'Sois la première à partager.',
        mural_anon_name: 'Femme anonyme',
        composer_mural_title: 'Nouvelle publication',
        composer_anon_label: 'Anonyme',
        composer_mural_placeholder: 'Que veux-tu partager ?',
        composer_mural_submit: 'Partager',
        composer_apoio_title: 'Nouvelle carte de soutien',
        composer_apoio_need: "J'ai besoin de soutien",
        composer_apoio_offer: 'Je peux aider',
        composer_apoio_title_placeholder: 'Titre (ex : Besoin de compagnie pour un rendez-vous)',
        composer_apoio_cat_label: 'Catégorie',
        composer_apoio_desc_placeholder: 'Décris ce dont tu as besoin ou comment tu peux aider…',
        composer_apoio_submit: 'Publier',
        apoio_cat_acompanhamento: 'Accompagnement', apoio_cat_transporte: 'Transport',
        apoio_cat_criancas: 'Enfants', apoio_cat_juridico: 'Juridique',
        apoio_cat_grupo: 'Groupe', apoio_cat_trabalho: 'Travail',
        apoio_city_placeholder: 'Filtrer par ville…',
        apoio_requests_title: 'Demandes de connexion',
        apoio_empty: 'Pas encore de cartes de soutien.',
        apoio_empty_sub: 'Crée la première !',
        apoio_connect: 'Connecter',
        apoio_badge_need: 'Besoin de soutien', apoio_badge_offer: 'Peut aider',
        servicos_emprego: 'Emploi', servicos_formacao: 'Formation',
        servicos_empreender: 'Entreprendre', servicos_voluntariado: 'Bénévolat',
        dir_title: 'Réseau de Sortie',
        dir_desc: 'Professionnelles sélectionnées pour te soutenir — avocates, psychologues et assistantes sociales.',
        dir_badge: 'En développement',
        dir_todas: 'Toutes', dir_advogadas: 'Avocates', dir_psicologas: 'Psychologues', dir_assistente: 'Assist. sociale',
        dir_loc_todas: 'Toutes',
        profile_stat_messages: 'messages', profile_stat_insights: 'insights', profile_stat_since: 'membre depuis',
        profile_bio_label: 'Bio', profile_bio_empty: 'Pas de bio encore.',
        profile_insights_empty: 'Aucun insight sauvegardé.',
        profile_insights_empty_sub: 'Touche le signet sur les messages d\'Alice pour sauvegarder.',
        profile_edit_title: 'Modifier le profil',
        profile_edit_name: 'Nom', profile_edit_name_placeholder: 'Ton nom complet',
        profile_edit_bio: 'Bio', profile_edit_bio_placeholder: 'Parle-nous un peu de toi…',
        profile_save: 'Enregistrer',
        voice_enabled: 'Voix activée', voice_profile_label: 'Profil vocal',
        voice_acolhedora: 'Chaleureuse', voice_firme: 'Ferme', voice_neutra: 'Neutre',
        voice_speed: 'Vitesse', voice_whisper_mode: 'Mode chuchotement',
        toast_checkin: 'Noté. Je suis là pour toi 💛',
        toast_conversation_saved: 'Conversation sauvegardée. Continue quand tu veux.',
        toast_profile_updated: 'Profil mis à jour !',
        toast_photo_updated: 'Photo mise à jour !',
        toast_scanner_min: 'Colle un texte d\'au moins 20 caractères.',
        toast_error_scanner: 'Erreur de connexion avec Alice.',
        toast_error_profile: 'Erreur lors du chargement du profil.',
        toast_error_photo: 'Erreur lors de l\'envoi de la photo.',
        toast_error_photo_size: 'Image trop grande (max 2 Mo).',
        toast_file_unsupported: 'Type de fichier non pris en charge.',
        toast_file_too_large: 'Fichier trop volumineux (max 5 Mo).',
        toast_max_files: 'Maximum 10 fichiers par envoi.',
        chat_attach: 'Joindre un fichier',
        toast_error_publish: 'Erreur lors de la publication.',
        toast_error_network: 'Erreur réseau.',
        toast_fill_title: 'Remplis le titre.',
        toast_name_required: 'Le nom ne peut pas être vide.',
        composer_mural_empty: 'Écris quelque chose à partager.',
        composer_name_label: 'Avec mon nom',
        servicos_empty: 'Aucun service trouvé.',
        talk_with_alice: 'Parler avec Alice',
        dir_loc_brazil: 'Brésil',
        dir_loc_portugal: 'Portugal',
        btn_listen: 'Écouter le message',
        btn_save_insight: 'Sauvegarder la réflexion',
        alice_fallback: 'Je suis là. Tu peux commencer.',
        alice_error: 'Quelque chose a mal tourné. Tu peux réessayer ?',
        toast_generating_summary: 'Génération du résumé…',
        toast_summary_saved: 'Résumé sauvegardé dans ton profil !',
        toast_chat_ended: 'Conversation terminée.',
        toast_insight_error: 'Erreur lors de la sauvegarde.',
        toast_published: 'Partagé avec la communauté.',
        toast_apoio_published: 'Carte de soutien publiée.',
        toast_scanner_error: 'Erreur d\'analyse.',
        reaction_abraco: 'Je suis avec toi',
        reaction_forca: 'Courage',
        reaction_identifico: 'Je m\'identifie',
        toast_insight_saved: 'Réflexion sauvegardée !',
        onboarding_photo_title: 'Mettons un visage sur le nom',
        onboarding_photo_subtitle: 'Choisis une photo qui montre qui tu es vraiment',
        onboarding_photo_take: 'Prendre une Photo',
        onboarding_photo_gallery: 'Choisir de la Galerie',
        onboarding_photo_skip: 'Passer',
        onboarding_photo_confirm: 'Utiliser cette photo',
        onboarding_photo_retake: 'Choisir une autre'
    }
};

let currentLang = 'pt-br';

function t(key) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['pt-br'];
    return dict[key] || (TRANSLATIONS['pt-br'][key] || key);
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (val && val !== key) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = val;
            } else if (el.tagName === 'OPTION') {
                el.textContent = val;
            } else {
                el.textContent = val;
            }
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const val = t(el.getAttribute('data-i18n-title'));
        if (val) el.title = val;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const val = t(el.getAttribute('data-i18n-aria'));
        if (val) el.setAttribute('aria-label', val);
    });

    const tabTitles = { home: t('tab_home'), diretorio: t('tab_diretorio'), rede: t('tab_rede'), meuspaco: t('tab_meuspaco') };
    document.querySelectorAll('.nav-label').forEach(el => {
        const navItem = el.closest('.nav-item');
        const tab = navItem?.getAttribute('data-tab');
        if (tab && tabTitles[tab]) el.textContent = tabTitles[tab];
    });
}

// ── Auth helpers ──────────────────────────────────────────
function getToken() { return localStorage.getItem('alice_token') || ''; }

function authFetch(url, options = {}) {
    const headers = Object.assign({}, options.headers || {});
    const token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(url, Object.assign({}, options, { headers }));
}

function clearAuth() {
    localStorage.removeItem('alice_token');
    localStorage.removeItem('alice_user');
}

async function initApp() {
    const token = getToken();
    if (!token) { window.location.href = '/login'; return; }
    try {
        const res = await authFetch('/api/auth/me');
        if (!res.ok) { clearAuth(); window.location.href = '/login'; return; }
        const user = await res.json();
        window.ALICE_USER_FIRST = user.name.split(' ')[0];
        localStorage.setItem('alice_user', JSON.stringify(user));

        currentLang = user.language || localStorage.getItem('alice_lang') || 'pt-br';
        localStorage.setItem('alice_lang', currentLang);
        applyTranslations();

        userCity = user.city || '';
        userRegion = user.region || '';
        if (userCity || userRegion) {
            dirLocation = userCity;
            updateLocationIndicators();
        }

        userTier = user.subscription_tier || 'essencial';
        vipTokens = user.vip_tokens || 0;
        try {
            const subRes = await authFetch('/api/subscription/status');
            if (subRes.ok) {
                const subData = await subRes.json();
                userTier = subData.tier || 'essencial';
                dailyMessagesUsed = subData.daily_messages_used || 0;
                dailyMessageLimit = subData.daily_limit || 3;
                vipTokens = subData.vip_tokens || 0;
            }
        } catch {}
        updateMessageCounter();
        updateTierUI();

        startNotifPolling();

        if (!user.onboarding_complete) {
            startOnboarding();
        } else {
            if (!userCity && !userRegion) {
                requestUserGeolocation();
            }
            await loadHomeTab();
        }
    } catch {
        clearAuth();
        window.location.href = '/login';
    }
}

async function logoutUser() {
    try { await authFetch('/api/auth/logout', { method: 'POST' }); } catch {}
    clearAuth();
    window.location.href = '/login';
}

async function confirmDeleteAccount() {
    const confirmed = confirm('Tens a certeza? Esta ação é irreversível e apagará permanentemente todo o teu histórico de conversas, humores e dados sensíveis dos nossos servidores.');
    if (!confirmed) return;
    const doubleConfirm = confirm('ÚLTIMA CONFIRMAÇÃO: Todos os teus dados serão eliminados permanentemente. Desejas continuar?');
    if (!doubleConfirm) return;
    try {
        const res = await authFetch('/api/account/delete', { method: 'POST' });
        const data = await res.json();
        if (res.ok) {
            clearAuth();
            window.location.href = '/login?deleted=1';
        } else {
            alert(data.error || 'Erro ao apagar conta.');
        }
    } catch {
        alert('Erro de conexão. Tenta novamente.');
    }
}


// ── Tab state ─────────────────────────────────────────────
let currentTab = 'home';
let userTier = 'essencial';
let dailyMessagesUsed = 0;
let dailyMessageLimit = 3;
let vipTokens = 0;

function getTabTitles() {
    return {
        home:      t('tab_home'),
        diretorio: t('tab_diretorio'),
        rede:      t('tab_rede'),
        minicursos: 'Mini Cursos',
        meuspaco:  t('tab_meuspaco')
    };
}

function switchTab(tab) {
    if (userTier === 'essencial') {
        if (tab === 'diretorio') { showFeatureUpgradeModal('Diretório'); return; }
        if (tab === 'minicursos') { showFeatureUpgradeModal('Mini Cursos'); return; }
    }
    exitChatFullscreen();
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tab)?.classList.add('active');
    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');

    const titleEl = document.getElementById('header-title');
    if (titleEl) titleEl.textContent = getTabTitles()[tab] ?? tab;

    const btnBack      = document.getElementById('btn-back');
    const headerLogo   = document.getElementById('header-logo');
    const btnLogout    = document.getElementById('btn-logout');
    const btnEmergency = document.getElementById('btn-emergency');
    const btnNotif     = document.getElementById('btn-notifications');

    btnBack?.classList.add('hidden');
    btnLogout?.classList.add('hidden');
    btnEmergency?.classList.add('hidden');
    headerLogo?.classList.remove('hidden');
    btnNotif?.classList.remove('hidden');

    if (tab === 'home') {
        if (currentTopic) {
            enterChatFullscreen();
        } else {
            document.getElementById('home-landing')?.classList.remove('hidden');
            document.getElementById('home-welcome')?.classList.add('hidden');
        }
    } else {
        btnBack?.classList.remove('hidden');
        headerLogo?.classList.add('hidden');
        btnLogout?.classList.remove('hidden');
    }

    currentTab = tab;

    const redeFab = document.getElementById('rede-fab');
    if (redeFab) {
        if (tab === 'rede') {
            redeFab.classList.remove('hidden');
        } else {
            redeFab.classList.add('hidden');
        }
    }

    if (tab === 'diretorio') loadDiretorio();
    if (tab === 'rede')      loadRede();
    if (tab === 'meuspaco')  loadProfile();
    if (tab === 'minicursos') {} // placeholder — content is static for now
}


// ══════════════════════════════════════════════════════════
// ONBOARDING
// ══════════════════════════════════════════════════════════
let onboardingMsgCount = 0;
let onboardingDone = false;

async function startOnboarding() {
    const overlay = document.getElementById('onboarding-overlay');
    overlay?.classList.remove('hidden');

    const chat = document.getElementById('onboarding-chat');
    if (!chat) return;
    chat.innerHTML = '';

    // Show input area in case it was hidden from a previous session
    const inputArea = document.getElementById('onboarding-input-area');
    if (inputArea) inputArea.style.display = '';

    try {
        const res = await authFetch('/api/onboarding/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: '__init__' })
        });
        const data = await res.json();

        if (data.history && data.history.length) {
            // Returning user — replay the full conversation
            data.history.forEach(m => appendOnboardingMsg(m.role, m.content));
        } else if (data.reply) {
            // New user — show the opener
            appendOnboardingMsg('assistant', data.reply);
        } else {
            appendOnboardingMsg('assistant', 'Olá! Eu sou a Alice. Como você se chama?');
        }
    } catch {
        appendOnboardingMsg('assistant', 'Olá! Eu sou a Alice. Como você se chama?');
    }
}

function appendOnboardingMsg(role, content) {
    const chat = document.getElementById('onboarding-chat');
    if (!chat) return;
    const div = document.createElement('div');
    div.className = role === 'assistant'
        ? 'alice-row alice-row--alice animate__animated animate__fadeInUp'
        : 'alice-row alice-row--user animate__animated animate__fadeIn';
    if (role === 'assistant') {
        div.innerHTML = `${aliceAvatarHTML()}
            <div class="alice-bubble alice-bubble--alice">
                <div class="alice-bubble-text">${formatAliceText(content)}</div>
            </div>`;
    } else {
        div.innerHTML = `<div class="alice-bubble alice-bubble--user">
                <div class="alice-bubble-text">${escHtml(content)}</div>
            </div>${userAvatarHTML()}`;
    }
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function showOnboardingTyping() {
    const chat = document.getElementById('onboarding-chat');
    if (!chat || document.getElementById('onboarding-typing')) return;
    const div = document.createElement('div');
    div.id = 'onboarding-typing';
    div.className = 'alice-row alice-row--alice';
    div.innerHTML = `${aliceAvatarHTML()}
        <div class="alice-bubble alice-bubble--alice alice-bubble--typing">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function removeOnboardingTyping() {
    document.getElementById('onboarding-typing')?.remove();
}

async function sendOnboardingMessage() {
    const input = document.getElementById('onboarding-input');
    const content = input?.value.trim();
    if (!content) return;
    input.value = '';
    aliceInputResize(input);

    appendOnboardingMsg('user', content);
    onboardingMsgCount++;

    const btn = document.getElementById('btn-onboarding-send');
    if (btn) { btn.disabled = true; btn.classList.remove('chat-send-pulse'); }
    if (input) input.disabled = true;
    showOnboardingTyping();

    try {
        const res = await authFetch('/api/onboarding/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: content })
        });
        const data = await res.json();
        removeOnboardingTyping();
        const reply = data.reply || 'Estou aqui, pode continuar.';
        appendOnboardingMsg('assistant', reply);
        if (data.is_final) {
            const inputArea = document.getElementById('onboarding-input-area');
            if (inputArea) inputArea.style.display = 'none';
            setTimeout(() => {
                showOnboardingPhotoStep();
            }, 2800);
        }
    } catch {
        removeOnboardingTyping();
        appendOnboardingMsg('assistant', 'Obrigada por compartilhar. Pode continuar.');
    } finally {
        if (btn) btn.disabled = false;
        if (input) input.disabled = false;
        input?.focus();
    }
}

function onboardingKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendOnboardingMessage();
    }
}

async function completeOnboarding() {
    try {
        await authFetch('/api/onboarding/complete', { method: 'POST' });
    } catch {}
    document.getElementById('onboarding-overlay')?.classList.add('hidden');
    requestUserGeolocation();
    await loadHomeTab();
}

async function skipOnboarding() {
    try {
        await authFetch('/api/onboarding/complete', { method: 'POST' });
    } catch {}
    document.getElementById('onboarding-overlay')?.classList.add('hidden');
    requestUserGeolocation();
    await loadHomeTab();
}

let userCity = '';
let userRegion = '';

function requestUserGeolocation() {
    if (!navigator.geolocation) return;
    const backdrop = document.getElementById('geo-dialog-backdrop');
    if (backdrop) backdrop.classList.remove('hidden');
}

function geoDialogAllow() {
    document.getElementById('geo-dialog-backdrop')?.classList.add('hidden');
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            try {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=pt`, {
                    headers: { 'User-Agent': 'AliceApp/1.0' }
                });
                const geo = await resp.json();
                const addr = geo.address || {};
                const city = addr.city || addr.town || addr.village || addr.municipality || '';
                const region = addr.country || '';
                if (city || region) {
                    userCity = city;
                    userRegion = region;
                    await authFetch('/api/profile/location', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ city, region })
                    });
                    updateLocationIndicators();
                }
            } catch {}
        },
        () => {},
        { enableHighAccuracy: false, timeout: 10000 }
    );
}

function geoDialogDeny() {
    document.getElementById('geo-dialog-backdrop')?.classList.add('hidden');
}

function updateLocationIndicators() {
    const label = userCity && userRegion
        ? `📍 ${userCity}, ${userRegion}`
        : userCity || userRegion
            ? `📍 ${userCity || userRegion}`
            : '';
    const dirEl = document.getElementById('dir-location-indicator');
    const redeEl = document.getElementById('rede-location-indicator');
    if (dirEl) dirEl.textContent = label;
    if (redeEl) redeEl.textContent = label;
}


// ══════════════════════════════════════════════════════════
// HOME TAB — Welcome / Check-in / Starters
// ══════════════════════════════════════════════════════════
let currentTopic = null;
let emergencyMode = false;
let todayMood = null;

async function loadHomeTab() {
    try {
        const res = await authFetch('/api/alice/topics');
        const topics = await res.json();
        topics.forEach(t => {
            const badge = document.getElementById('badge-' + t);
            if (badge) badge.style.display = 'inline-block';
        });
    } catch {}

    loadPilulas();
    loadVoicePrefs();

    // Check today's check-in
    const today = new Date().toISOString().slice(0, 10);
    const savedCheckin = localStorage.getItem('alice_checkin');
    if (savedCheckin) {
        try {
            const obj = JSON.parse(savedCheckin);
            if (obj.date === today) {
                todayMood = obj.mood;
                markCheckinDone(obj.mood);
            }
        } catch {}
    }

    showLanding();
}

function exitChatFullscreen() {
    document.querySelector('.app-header')?.classList.remove('hidden');
    document.querySelector('.bottom-nav')?.classList.remove('hidden');
    document.querySelector('.app-main')?.classList.remove('chat-fullscreen');
}

function enterChatFullscreen() {
    document.querySelector('.app-header')?.classList.add('hidden');
    document.querySelector('.bottom-nav')?.classList.add('hidden');
    document.getElementById('safe-exit-btn')?.classList.add('hidden');
    document.querySelector('.app-main')?.classList.add('chat-fullscreen');
}

function showLanding() {
    exitChatFullscreen();
    document.getElementById('home-landing')?.classList.remove('hidden');
    document.getElementById('home-welcome')?.classList.add('hidden');
    document.getElementById('alice-chat-list')?.classList.add('hidden');
    document.getElementById('alice-input-bar')?.classList.add('hidden');
    document.getElementById('chat-topbar')?.classList.add('hidden');
    document.getElementById('scanner-view')?.classList.add('hidden');
    document.getElementById('btn-back')?.classList.add('hidden');
    document.getElementById('btn-emergency')?.classList.add('hidden');
    document.getElementById('header-logo')?.classList.remove('hidden');
    const titleEl = document.getElementById('header-title');
    if (titleEl) titleEl.textContent = 'Alice';
    currentTopic = null;
    emergencyMode = false;
    document.getElementById('emergency-banner')?.classList.add('hidden');
}

function showWelcome() {
    showLanding();
}

function showTopicSelection() {
    exitChatFullscreen();
    document.getElementById('home-landing')?.classList.add('hidden');
    document.getElementById('home-welcome')?.classList.remove('hidden');
    document.getElementById('alice-chat-list')?.classList.add('hidden');
    document.getElementById('alice-input-bar')?.classList.add('hidden');
    document.getElementById('chat-topbar')?.classList.add('hidden');
    document.getElementById('btn-back')?.classList.remove('hidden');
    document.getElementById('header-logo')?.classList.add('hidden');
    document.getElementById('btn-emergency')?.classList.add('hidden');
    const titleEl = document.getElementById('header-title');
    if (titleEl) titleEl.textContent = t('talk_with_alice');
    currentTopic = null;
}

function startEmergencyFromHome() {
    emergencyMode = true;
    selectTopic('conversa');
    const btn = document.getElementById('btn-emergency');
    const banner = document.getElementById('emergency-banner');
    btn?.classList.remove('hidden');
    btn?.classList.add('header-btn--sos-active');
    banner?.classList.remove('hidden');
}

function setCheckin(mood) {
    todayMood = mood;
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('alice_checkin', JSON.stringify({ date: today, mood }));
    markCheckinDone(mood);
    showToast(t('toast_checkin'));
}

function markCheckinDone(mood) {
    const widget = document.getElementById('checkin-widget');
    if (!widget) return;
    widget.querySelectorAll('.checkin-btn').forEach(btn => {
        btn.classList.toggle('checkin-btn--active', btn.dataset.mood === mood);
    });
    widget.classList.add('checkin-done');
}

async function selectTopic(topic) {
    currentTopic = topic;

    const topicLabels = {
        desabafo: t('topic_label_desabafo'),
        amor:     t('topic_label_amor'),
        trabalho: t('topic_label_trabalho'),
        familia:  t('topic_label_familia'),
        conversa: t('topic_label_conversa'),
        direitos: t('topic_label_direitos')
    };

    enterChatFullscreen();

    document.getElementById('home-landing')?.classList.add('hidden');
    document.getElementById('home-welcome')?.classList.add('hidden');
    document.getElementById('alice-chat-list')?.classList.remove('hidden');
    document.getElementById('alice-input-bar')?.classList.remove('hidden');
    document.getElementById('chat-topbar')?.classList.remove('hidden');
    document.getElementById('scanner-view')?.classList.add('hidden');

    const topicLabel = document.getElementById('chat-topbar-topic');
    if (topicLabel) topicLabel.textContent = topicLabels[topic] || topic;

    await loadAliceHistory(topic);
}

function closeChatView() {
    showLanding();
}

function handleBack() {
    if (currentTab === 'diretorio' || currentTab === 'rede' || currentTab === 'meuspaco') {
        switchTab('home');
        return;
    }
    if (currentTopic) {
        closeChatView();
        return;
    }
    const scannerVisible = !document.getElementById('scanner-view')?.classList.contains('hidden');
    const topicsVisible = !document.getElementById('home-welcome')?.classList.contains('hidden');
    if (scannerVisible || topicsVisible) {
        showLanding();
    } else {
        showLanding();
    }
}

function goBackToWelcome() {
    showTopicSelection();
    showToast(t('toast_conversation_saved'));
}

async function encerrarConversa() {
    if (!currentTopic) return;
    await resetAliceChat();
}

async function backToStarters() {
    goBackToWelcome();
}


// ══════════════════════════════════════════════════════════
// EMERGENCY MODE
// ══════════════════════════════════════════════════════════
function toggleEmergency() {
    emergencyMode = !emergencyMode;
    const btn    = document.getElementById('btn-emergency');
    const banner = document.getElementById('emergency-banner');
    btn?.classList.toggle('header-btn--sos-active', emergencyMode);
    banner?.classList.toggle('hidden', !emergencyMode);
    if (emergencyMode) {
        showToast(t('emergency_banner'));
    }
}


// ══════════════════════════════════════════════════════════
// TAB 1 — HOME (Alice AI Chat)
// ══════════════════════════════════════════════════════════
let aliceWaiting = false;

function aliceAvatarHTML() {
    return `<div class="alice-av">
        <img src="/static/img/logo.png" alt="Alice">
    </div>`;
}

function userAvatarHTML() {
    const initial = (window.ALICE_USER_FIRST || 'U').charAt(0).toUpperCase();
    return `<div class="alice-user-av">${escHtml(initial)}</div>`;
}

let _animateNewMessages = false;

function renderAliceMessage(content, time, msgId, sentiment) {
    const div = document.createElement('div');
    div.className = 'alice-row alice-row--alice' + (_animateNewMessages ? ' animate__animated animate__fadeInUp' : '');
    div.dataset.msgId = msgId || '';
    div.dataset.sentiment = sentiment || 'neutro';
    div.innerHTML = `
        ${aliceAvatarHTML()}
        <div class="alice-bubble alice-bubble--alice">
            <div class="alice-bubble-text">${formatAliceText(content)}</div>
            <div class="alice-bubble-footer">
                ${time ? `<span class="alice-bubble-time">${time}</span>` : '<span></span>'}
                <div class="bubble-actions">
                    <button class="btn-tts" onclick="playMessageTTS(this)" title="${t('btn_listen')}"
                            data-text="${escHtml(content).replace(/"/g,'&quot;')}"
                            data-sentiment="${sentiment || 'neutro'}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tts-icon">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        </svg>
                        <div class="tts-wave hidden">
                            <span class="tts-bar"></span>
                            <span class="tts-bar"></span>
                            <span class="tts-bar"></span>
                            <span class="tts-bar"></span>
                        </div>
                    </button>
                    <button class="btn-save-insight" onclick="saveInsight(this)" title="${t('btn_save_insight')}"
                            data-content="${escHtml(content).replace(/"/g,'&quot;')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`;
    return div;
}

function renderUserMessage(content, time) {
    const div = document.createElement('div');
    div.className = 'alice-row alice-row--user' + (_animateNewMessages ? ' animate__animated animate__fadeIn' : '');
    div.innerHTML = `
        <div class="alice-bubble alice-bubble--user">
            <div class="alice-bubble-text">${escHtml(content)}</div>
            ${time ? `<div class="alice-bubble-time">${time}</div>` : ''}
        </div>
        ${userAvatarHTML()}`;
    return div;
}

function formatAliceText(text) {
    return escHtml(text)
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
}

function showTypingIndicator() {
    const list = document.getElementById('alice-chat-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'alice-row alice-row--alice';
    div.id = 'alice-typing';
    div.innerHTML = `${aliceAvatarHTML()}
        <div class="alice-bubble alice-bubble--alice alice-bubble--typing">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>`;
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
}

function removeTypingIndicator() {
    document.getElementById('alice-typing')?.remove();
}

async function loadAliceHistory(topic) {
    const list = document.getElementById('alice-chat-list');
    if (!list) return;
    list.innerHTML = '';
    _animateNewMessages = false;
    try {
        const res  = await authFetch('/api/alice/history?topic=' + encodeURIComponent(topic));
        const data = await res.json();
        if (!data.length) {
            _animateNewMessages = true;
            await sendTopicOpener(topic);
            return;
        }
        data.forEach(m => {
            const el = m.role === 'assistant'
                ? renderAliceMessage(m.content, m.created_at, m.id)
                : renderUserMessage(m.content, m.created_at);
            list.appendChild(el);
        });
        list.scrollTop = list.scrollHeight;
        _animateNewMessages = true;
    } catch {
        _animateNewMessages = true;
        await sendTopicOpener(topic);
    }
}

async function sendTopicOpener(topic) {
    const list = document.getElementById('alice-chat-list');
    if (!list) return;
    showTypingIndicator();
    try {
        const res = await authFetch('/api/alice/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: '__topic_start__',
                topic,
                checkin_mood: todayMood || ''
            })
        });
        removeTypingIndicator();
        const data = await res.json();
        if (data.reply) {
            const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            list.appendChild(renderAliceMessage(data.reply, now, data.message_id));
            list.scrollTop = list.scrollHeight;
        }
    } catch {
        removeTypingIndicator();
        list.appendChild(renderAliceMessage(t('alice_fallback'), ''));
        list.scrollTop = list.scrollHeight;
    }
}

async function sendAliceMessage() {
    if (pendingFiles.length) return sendAliceMessageWithFile();
    if (aliceWaiting || !currentTopic) return;
    const input   = document.getElementById('alice-input');
    const content = input.value.trim();
    if (!content) return;

    input.value = '';
    aliceInputResize(input);
    input.disabled = true;
    aliceWaiting   = true;

    const btn = document.getElementById('btn-alice-send');
    if (btn) { btn.disabled = true; btn.classList.remove('chat-send-pulse'); }

    const list = document.getElementById('alice-chat-list');
    const now  = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    list.appendChild(renderUserMessage(content, now));
    list.scrollTop = list.scrollHeight;
    showTypingIndicator();

    const moodToSend = todayMood && !sessionStorage.getItem('alice_mood_sent') ? todayMood : '';
    if (moodToSend) sessionStorage.setItem('alice_mood_sent', '1');

    try {
        const res = await authFetch('/api/alice/chat', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({
                message: content,
                topic: currentTopic,
                emergency: emergencyMode,
                checkin_mood: moodToSend
            })
        });

        const ct = res.headers.get('content-type') || '';

        if (res.status === 403) {
            const data = await res.json();
            removeTypingIndicator();
            if (data.upgrade) {
                list.lastChild?.remove();
                showUpgradeModal();
            }
            return;
        }

        if (ct.includes('text/event-stream')) {
            removeTypingIndicator();
            const aliceRow = document.createElement('div');
            aliceRow.className = 'alice-row alice-row--alice animate__animated animate__fadeInUp';
            aliceRow.innerHTML = `${aliceAvatarHTML()}<div class="alice-bubble alice-bubble--alice"><div class="alice-bubble-text"></div><div class="alice-bubble-footer"><span class="alice-bubble-time">${now}</span><div class="bubble-actions"></div></div></div>`;
            list.appendChild(aliceRow);
            const textEl = aliceRow.querySelector('.alice-bubble-text');
            let fullText = '';
            let msgId = null;
            let sentiment = 'neutro';

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop();
                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    try {
                        const payload = JSON.parse(line.slice(6));
                        if (payload.done) {
                            msgId = payload.message_id;
                            sentiment = payload.sentiment || 'neutro';
                        } else if (payload.token) {
                            fullText += payload.token;
                            textEl.innerHTML = formatAliceText(fullText);
                            list.scrollTop = list.scrollHeight;
                        }
                    } catch {}
                }
            }

            if (!fullText.trim()) fullText = t('alice_error');
            textEl.innerHTML = formatAliceText(fullText);
            aliceRow.dataset.msgId = msgId || '';
            aliceRow.dataset.sentiment = sentiment;
            const actions = aliceRow.querySelector('.bubble-actions');
            if (actions) {
                const safeContent = escHtml(fullText).replace(/"/g,'&quot;');
                actions.innerHTML = `
                    <button class="btn-tts" onclick="playMessageTTS(this)" title="${t('btn_listen')}" data-text="${safeContent}" data-sentiment="${sentiment}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tts-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                        <div class="tts-wave hidden"><span class="tts-bar"></span><span class="tts-bar"></span><span class="tts-bar"></span><span class="tts-bar"></span></div>
                    </button>
                    <button class="btn-save-insight" onclick="saveInsight(this)" title="${t('btn_save_insight')}" data-content="${safeContent}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    </button>`;
            }
            dailyMessagesUsed++;
            updateMessageCounter();
            list.scrollTop = list.scrollHeight;
        } else {
            const data = await res.json();
            removeTypingIndicator();
            dailyMessagesUsed++;
            updateMessageCounter();
            const reply = data.reply || t('alice_error');
            list.appendChild(renderAliceMessage(reply, now, data.message_id, data.sentiment));
            list.scrollTop = list.scrollHeight;
        }
    } catch {
        removeTypingIndicator();
        list.appendChild(renderAliceMessage(t('alice_error'), ''));
        list.scrollTop = list.scrollHeight;
    } finally {
        aliceWaiting   = false;
        input.disabled = false;
        if (btn) btn.disabled = false;
        input.focus();
    }
}

async function resetAliceChat() {
    if (!currentTopic) return;
    showToast(t('toast_generating_summary'));
    try {
        const res = await authFetch('/api/alice/summary', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ topic: currentTopic })
        });
        const data = await res.json();
        if (data.summary) showToast(t('toast_summary_saved'));
        else showToast(t('toast_chat_ended'));
    } catch {
        showToast(t('toast_chat_ended'));
    }
    const badge = document.getElementById('badge-' + currentTopic);
    if (badge) badge.style.display = 'none';
    showLanding();
}

async function saveInsight(btn) {
    const content = btn.dataset.content;
    if (!content) return;
    btn.classList.add('btn-save-insight--saved');
    btn.disabled = true;
    try {
        await authFetch('/api/insights', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ content, topic: currentTopic || 'geral' })
        });
        showToast(t('toast_insight_saved'));
    } catch {
        btn.classList.remove('btn-save-insight--saved');
        btn.disabled = false;
        showToast(t('toast_insight_error'));
    }
}

function aliceInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAliceMessage();
    }
}

function aliceInputResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

let pendingFiles = [];

function renderFilePreviewList(containerId, files, removeFunc) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!files.length) { container.classList.add('hidden'); return; }
    container.classList.remove('hidden');
    files.forEach((file, idx) => {
        const item = document.createElement('div');
        item.className = 'attach-preview-inner';
        const isImg = file.type.startsWith('image/');
        if (isImg) {
            const img = document.createElement('img');
            img.className = 'attach-preview-img';
            img.alt = file.name;
            const reader = new FileReader();
            reader.onload = (e) => { img.src = e.target.result; };
            reader.readAsDataURL(file);
            item.appendChild(img);
        }
        const nameSpan = document.createElement('span');
        nameSpan.className = 'attach-preview-name';
        nameSpan.textContent = file.name;
        item.appendChild(nameSpan);
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'attach-preview-remove';
        removeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M18 6L6 18M6 6l12 12"/></svg>';
        removeBtn.onclick = () => removeFunc(idx);
        item.appendChild(removeBtn);
        container.appendChild(item);
    });
}

function validateAndAddFiles(newFiles, targetArray, maxFiles) {
    const maxSize = 5 * 1024 * 1024;
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];
    let added = 0;
    for (const file of newFiles) {
        if (targetArray.length >= maxFiles) { showToast(t('toast_max_files')); break; }
        if (file.size > maxSize) { showToast(t('toast_file_too_large')); continue; }
        if (!allowed.includes(file.type)) { showToast(t('toast_file_unsupported')); continue; }
        targetArray.push(file);
        added++;
    }
    return added;
}

function handleFileSelect(input) {
    if (!input.files?.length) return;
    validateAndAddFiles(Array.from(input.files), pendingFiles, 10);
    input.value = '';
    renderFilePreviewList('chat-attach-preview', pendingFiles, removeChatFile);
}

function removeChatFile(idx) {
    pendingFiles.splice(idx, 1);
    renderFilePreviewList('chat-attach-preview', pendingFiles, removeChatFile);
}

function removeAttachment() {
    pendingFiles = [];
    const input = document.getElementById('chat-file-input');
    if (input) input.value = '';
    const container = document.getElementById('chat-attach-preview');
    if (container) { container.innerHTML = ''; container.classList.add('hidden'); }
}

async function sendAliceMessageWithFile() {
    if (aliceWaiting || !currentTopic || !pendingFiles.length) return;
    const input = document.getElementById('alice-input');
    const content = input.value.trim();

    input.value = '';
    aliceInputResize(input);
    input.disabled = true;
    aliceWaiting = true;

    const btn = document.getElementById('btn-alice-send');
    if (btn) { btn.disabled = true; btn.classList.remove('chat-send-pulse'); }

    const list = document.getElementById('alice-chat-list');
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const filesToSend = [...pendingFiles];
    const userDiv = document.createElement('div');
    userDiv.className = 'alice-row alice-row--user';
    const bubbleInner = document.createElement('div');
    bubbleInner.className = 'alice-bubble alice-bubble--user';

    let imagesRendered = 0;
    for (const f of filesToSend) {
        if (f.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.className = 'chat-image-bubble';
            img.alt = f.name;
            const reader = new FileReader();
            reader.onload = (e) => { img.src = e.target.result; };
            reader.readAsDataURL(f);
            bubbleInner.appendChild(img);
            imagesRendered++;
        } else {
            const badge = document.createElement('div');
            badge.className = 'chat-file-badge';
            badge.textContent = '📎 ' + f.name;
            bubbleInner.appendChild(badge);
        }
    }
    if (content) {
        const textDiv = document.createElement('div');
        textDiv.className = 'alice-bubble-text';
        textDiv.textContent = content;
        bubbleInner.appendChild(textDiv);
    }
    const timeDiv = document.createElement('div');
    timeDiv.className = 'alice-bubble-time';
    timeDiv.textContent = now;
    bubbleInner.appendChild(timeDiv);
    userDiv.appendChild(bubbleInner);
    userDiv.insertAdjacentHTML('beforeend', userAvatarHTML());
    list.appendChild(userDiv);
    list.scrollTop = list.scrollHeight;

    showTypingIndicator();

    const formData = new FormData();
    filesToSend.forEach(f => formData.append('files', f));
    formData.append('message', content);
    formData.append('topic', currentTopic);
    formData.append('emergency', emergencyMode ? 'true' : 'false');

    const moodToSend = todayMood && !sessionStorage.getItem('alice_mood_sent') ? todayMood : '';
    if (moodToSend) {
        formData.append('checkin_mood', moodToSend);
        sessionStorage.setItem('alice_mood_sent', '1');
    }

    removeAttachment();

    try {
        const token = localStorage.getItem('alice_token');
        const res = await fetch('/api/alice/chat/upload', {
            method: 'POST',
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            body: formData
        });
        const data = await res.json();
        removeTypingIndicator();
        if (!res.ok) {
            if (res.status === 413) showToast(t('toast_file_too_large'));
            else if (data.error) showToast(data.error);
            else showToast(t('alice_error'));
            return;
        }
        const reply = data.reply || t('alice_error');
        list.appendChild(renderAliceMessage(reply, now, data.message_id, data.sentiment));
        list.scrollTop = list.scrollHeight;
    } catch {
        removeTypingIndicator();
        list.appendChild(renderAliceMessage(t('alice_error'), ''));
        list.scrollTop = list.scrollHeight;
    } finally {
        aliceWaiting = false;
        input.disabled = false;
        if (btn) btn.disabled = false;
        input.focus();
    }
}


// ══════════════════════════════════════════════════════════
// TAB 2 — DIRETÓRIO
// ══════════════════════════════════════════════════════════
let dirCategory = '';
let dirLocation = '';

function setDirCategory(btn, cat) {
    document.querySelectorAll('#dir-category-bar .filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    dirCategory = cat;
    loadDiretorio();
}

async function loadDiretorio() {
    updateLocationIndicators();
}


// ══════════════════════════════════════════════════════════
// TAB 3 — REDE (Mural + Apoio + Serviços)
// ══════════════════════════════════════════════════════════

let muralCurrentTheme = 'todos';
let apoioCurrentCat = '';
let currentRedePill = 'mural';
let apoioCardType = 'need';

async function loadRede() {
    updateLocationIndicators();
    loadMuralPosts();
    loadServicos();
    loadApoioCards();
    loadConnectionRequests();
    initRedeComposer();
    loadVozColetiva();
}

let muralMediaFile = null;

function initRedeComposer() {
    const ta = document.getElementById('mural-textarea');
    if (ta && !ta._hasInput) {
        ta._hasInput = true;
        ta.addEventListener('input', () => {
            const c = document.getElementById('mural-char-count');
            if (c) c.textContent = ta.value.length + '/500';
        });
    }
    const anonToggle = document.getElementById('mural-anon-toggle');
    if (anonToggle && !anonToggle._hasChange) {
        anonToggle._hasChange = true;
        anonToggle.addEventListener('change', () => {
            const label = document.getElementById('anon-toggle-label');
            if (label) label.textContent = anonToggle.checked ? t('composer_anon_label') : t('composer_name_label');
        });
    }
    const mediaInput = document.getElementById('mural-media-input');
    if (mediaInput && !mediaInput._hasChange) {
        mediaInput._hasChange = true;
        mediaInput.addEventListener('change', () => {
            const file = mediaInput.files[0];
            if (!file) return;
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                showToast('Arquivo muito grande. Máximo 10MB.');
                mediaInput.value = '';
                return;
            }
            muralMediaFile = file;
            showMediaPreview(file);
        });
    }
}

function showMediaPreview(file) {
    const preview = document.getElementById('composer-media-preview');
    if (!preview) return;
    preview.classList.remove('hidden');
    const isVideo = file.type.startsWith('video/');
    const url = URL.createObjectURL(file);
    if (isVideo) {
        preview.innerHTML = `<video src="${url}" controls playsinline muted></video><button class="composer-media-remove" onclick="removeMediaPreview()">✕</button>`;
    } else {
        preview.innerHTML = `<img src="${url}" alt=""><button class="composer-media-remove" onclick="removeMediaPreview()">✕</button>`;
    }
}

function removeMediaPreview() {
    muralMediaFile = null;
    const preview = document.getElementById('composer-media-preview');
    if (preview) { preview.innerHTML = ''; preview.classList.add('hidden'); }
    const mediaInput = document.getElementById('mural-media-input');
    if (mediaInput) mediaInput.value = '';
}

function switchRedePill(name) {
    currentRedePill = name;
    document.querySelectorAll('.rede-pill').forEach(b => b.classList.remove('active'));
    document.querySelector(`.rede-pill[data-subtab="${name}"]`)?.classList.add('active');
    document.querySelectorAll('.rede-subtab-content').forEach(el => el.classList.remove('active'));
    document.getElementById('subtab-' + name)?.classList.add('active');

    const indicator = document.querySelector('.rede-pill-indicator');
    if (indicator) {
        const idx = name === 'mural' ? 0 : name === 'apoio' ? 1 : 2;
        indicator.style.transform = `translateX(${idx * 100}%)`;
    }
}

function showRedeToast(msg) {
    const el = document.getElementById('rede-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 3500);
}

function openComposerSheet() {
    const backdrop = document.getElementById('composer-backdrop');
    const sheet = document.getElementById('composer-sheet');
    const muralPart = document.getElementById('composer-mural');
    const apoioPart = document.getElementById('composer-apoio');
    if (!sheet) return;
    backdrop?.classList.remove('hidden');
    sheet.classList.remove('hidden');
    if (currentRedePill === 'apoio') {
        muralPart?.classList.add('hidden');
        apoioPart?.classList.remove('hidden');
    } else {
        muralPart?.classList.remove('hidden');
        apoioPart?.classList.add('hidden');
    }
    attachComposerViewportHandler(sheet);
}

function closeComposerSheet() {
    document.getElementById('composer-backdrop')?.classList.add('hidden');
    const sheet = document.getElementById('composer-sheet');
    if (sheet) {
        sheet.classList.add('hidden');
        sheet.style.bottom = '';
        sheet.style.maxHeight = '';
    }
    removeMediaPreview();
    detachComposerViewportHandler();
}

let _composerVVHandler = null;
function attachComposerViewportHandler(sheet) {
    detachComposerViewportHandler();
    if (!window.visualViewport) return;
    const handler = () => {
        const vv = window.visualViewport;
        const offsetBottom = window.innerHeight - (vv.offsetTop + vv.height);
        sheet.style.bottom = offsetBottom + 'px';
        sheet.style.maxHeight = (vv.height * 0.7) + 'px';
        requestAnimationFrame(() => {
            const footer = sheet.querySelector('.composer-footer');
            if (footer) footer.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
    };
    window.visualViewport.addEventListener('resize', handler);
    window.visualViewport.addEventListener('scroll', handler);
    _composerVVHandler = handler;
}
function detachComposerViewportHandler() {
    if (_composerVVHandler && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', _composerVVHandler);
        window.visualViewport.removeEventListener('scroll', _composerVVHandler);
        _composerVVHandler = null;
    }
}

function selectApoioType(btn, type) {
    apoioCardType = type;
    document.querySelectorAll('.apoio-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

async function loadMuralPosts() {
    try {
        const url = muralCurrentTheme === 'todos' ? '/api/rede/posts' : `/api/rede/posts?theme=${muralCurrentTheme}`;
        const res = await authFetch(url);
        const posts = await res.json();
        const feed = document.getElementById('mural-feed');
        if (!feed) return;
        if (!posts.length) {
            feed.innerHTML = `<p class="mural-empty">${t('mural_empty')}<br>${t('mural_empty_sub')}</p>`;
            return;
        }
        feed.innerHTML = posts.map(p => {
            const isAnon = p.is_anonymous !== false;
            const avatarHtml = isAnon
                ? `<div class="mural-avatar anon">👤</div>`
                : (p.author_avatar_url
                    ? `<img class="mural-avatar mural-avatar-img" src="${escapeHtml(p.author_avatar_url)}" alt="">`
                    : `<div class="mural-avatar" style="background:${escapeHtml(p.author_avatar || '#8B2635')}">${(p.author_name || 'A')[0].toUpperCase()}</div>`);
            const nameHtml = isAnon
                ? `<span class="mural-author-name anon">${t('mural_anon_name')}</span>`
                : `<span class="mural-author-name">${escapeHtml(p.author_name || t('mural_anon_name'))}</span>`;

            const reactions = p.reactions || {};
            const userReacted = p.user_reacted || [];
            const reactionTypes = [
                { key: 'abraco', emoji: '🤗', label: t('reaction_abraco') },
                { key: 'forca', emoji: '💪', label: t('reaction_forca') },
                { key: 'identifico', emoji: '💜', label: t('reaction_identifico') },
            ];
            const reactionsHtml = reactionTypes.map(r => {
                const count = reactions[r.key] || 0;
                const isActive = userReacted.includes(r.key);
                return `<button class="reaction-chip${isActive ? ' active' : ''}" onclick="toggleReaction(${p.id},'${r.key}',this)" title="${r.label}">
                    <span>${r.emoji}</span>
                    <span class="reaction-count">${count || ''}</span>
                </button>`;
            }).join('');

            let mediaHtml = '';
            if (p.image_url) {
                const isVid = /\.(mp4|mov|webm)$/i.test(p.image_url);
                mediaHtml = isVid
                    ? `<div class="mural-post-media"><video src="${escapeHtml(p.image_url)}" controls playsinline></video></div>`
                    : `<div class="mural-post-media"><img src="${escapeHtml(p.image_url)}" alt="" loading="lazy"></div>`;
            }

            return `<div class="mural-post">
                <div class="mural-post-author">${avatarHtml}${nameHtml}</div>
                <div class="mural-post-content">${escapeHtml(p.content)}</div>
                ${mediaHtml}
                <div class="mural-post-meta">
                    <span class="mural-post-theme">${t('filter_' + p.theme) || p.theme}</span>
                    <span>${p.time}</span>
                </div>
                <div class="mural-reactions">${reactionsHtml}</div>
            </div>`;
        }).join('');
    } catch {
        showToast(t('toast_error_network'));
    }
}

function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

async function toggleReaction(postId, rtype, btn) {
    try {
        const res = await authFetch(`/api/rede/posts/${postId}/react`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reaction_type: rtype }),
        });
        const data = await res.json();
        if (data.success) {
            btn.classList.toggle('active', data.user_reacted.includes(rtype));
            const countEl = btn.querySelector('.reaction-count');
            if (countEl) countEl.textContent = (data.reactions[rtype] || '') + '';
        }
    } catch { /* silent */ }
}

function filterMural(btn, theme) {
    document.querySelectorAll('.mural-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    muralCurrentTheme = theme;
    loadMuralPosts();
}

async function publishMuralPost() {
    const ta = document.getElementById('mural-textarea');
    const sel = document.getElementById('mural-theme-select');
    const anonToggle = document.getElementById('mural-anon-toggle');
    if (!ta || !ta.value.trim()) { showToast(t('composer_mural_empty')); return; }

    try {
        let res;
        if (muralMediaFile) {
            const fd = new FormData();
            fd.append('content', ta.value.trim());
            fd.append('theme', sel?.value || 'geral');
            fd.append('is_anonymous', anonToggle ? anonToggle.checked : true);
            fd.append('media', muralMediaFile);
            res = await authFetch('/api/rede/posts', { method: 'POST', body: fd });
        } else {
            res = await authFetch('/api/rede/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: ta.value.trim(),
                    theme: sel?.value || 'geral',
                    is_anonymous: anonToggle ? anonToggle.checked : true,
                })
            });
        }
        const data = await res.json();
        if (data.success) {
            ta.value = '';
            document.getElementById('mural-char-count').textContent = '0/500';
            removeMediaPreview();
            closeComposerSheet();
            showRedeToast(t('toast_published'));
            loadMuralPosts();
        } else {
            showToast(data.error || t('toast_error_publish'));
        }
    } catch {
        showToast(t('toast_error_network'));
    }
}

async function loadApoioCards() {
    try {
        const city = document.getElementById('apoio-city-input')?.value.trim() || '';
        let url = '/api/apoio/cards';
        const params = [];
        if (city) params.push('city=' + encodeURIComponent(city));
        if (apoioCurrentCat) params.push('category=' + apoioCurrentCat);
        if (params.length) url += '?' + params.join('&');

        const res = await authFetch(url);
        const cards = await res.json();
        const container = document.getElementById('apoio-cards');
        if (!container) return;
        if (!cards.length) {
            container.innerHTML = `<p class="mural-empty">${t('apoio_empty')}<br>${t('apoio_empty_sub')}</p>`;
            return;
        }
        container.innerHTML = cards.map(c => {
            const isAnon = c.is_anonymous;
            const avatarBg = isAnon ? '#D5CFC8' : (c.author_avatar || '#8B2635');
            const hasPhoto = !isAnon && c.author_avatar_url;
            const avatarContent = isAnon ? '👤' : (c.author_name || 'A')[0].toUpperCase();
            const avatarStyle = isAnon ? '' : `style="background:${escapeHtml(avatarBg)}"`;
            const name = isAnon ? t('mural_anon_name') : escapeHtml(c.author_name || t('mural_anon_name'));
            const typeBadge = c.card_type === 'offer'
                ? `<span class="apoio-card-type-badge offer">${t('apoio_badge_offer')}</span>`
                : `<span class="apoio-card-type-badge need">${t('apoio_badge_need')}</span>`;
            const cityHtml = c.city ? `<span class="apoio-card-city">📍 ${escapeHtml(c.city)}</span>` : '';
            const connectBtn = c.is_mine ? '' : `<button class="apoio-connect-btn" onclick="sendConnectRequest(${c.id})">${t('apoio_connect')}</button>`;

            return `<div class="apoio-card type-${c.card_type}">
                <div class="apoio-card-header">
                    ${hasPhoto
                        ? `<img class="apoio-card-avatar apoio-avatar-img" src="${escapeHtml(c.author_avatar_url)}" alt="">`
                        : `<div class="apoio-card-avatar${isAnon ? ' anon' : ''}" ${avatarStyle}>${avatarContent}</div>`}
                    <div class="apoio-card-info">
                        <div class="apoio-card-name">${name}</div>
                        ${cityHtml}
                    </div>
                    ${typeBadge}
                </div>
                <div class="apoio-card-title">${escapeHtml(c.title)}</div>
                ${c.description ? `<div class="apoio-card-desc">${escapeHtml(c.description)}</div>` : ''}
                <div class="apoio-card-footer">
                    <span class="apoio-card-cat">${c.category}</span>
                    ${connectBtn}
                </div>
            </div>`;
        }).join('');
    } catch {
        showToast(t('toast_error_network'));
    }
}

function filterApoioCards() {
    loadApoioCards();
}

function filterApoioCat(btn, cat) {
    document.querySelectorAll('.apoio-cat-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    apoioCurrentCat = cat;
    loadApoioCards();
}

async function publishApoioCard() {
    const title = document.getElementById('apoio-title-input')?.value.trim();
    const desc = document.getElementById('apoio-desc-textarea')?.value.trim();
    const cat = document.getElementById('apoio-category-select')?.value || 'outro';
    const isAnon = document.getElementById('apoio-anon-toggle')?.checked || false;
    if (!title) { showToast(t('toast_fill_title')); return; }

    try {
        const res = await authFetch('/api/apoio/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                card_type: apoioCardType,
                title: title,
                description: desc || '',
                category: cat,
                is_anonymous: isAnon,
            })
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById('apoio-title-input').value = '';
            document.getElementById('apoio-desc-textarea').value = '';
            closeComposerSheet();
            showRedeToast(t('toast_apoio_published'));
            loadApoioCards();
        } else {
            showToast(data.error || t('toast_error_publish'));
        }
    } catch {
        showToast(t('toast_error_network'));
    }
}

async function sendConnectRequest(cardId) {
    try {
        const res = await authFetch('/api/apoio/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ card_id: cardId }),
        });
        const data = await res.json();
        if (data.success) {
            showRedeToast(data.message);
        } else {
            showRedeToast(data.error || t('toast_error_network'));
        }
    } catch {
        showToast(t('toast_error_network'));
    }
}

async function loadConnectionRequests() {
    try {
        const res = await authFetch('/api/apoio/requests');
        const requests = await res.json();
        const section = document.getElementById('apoio-requests-section');
        const list = document.getElementById('apoio-requests-list');
        if (!section || !list) return;

        const received = requests.filter(r => r.direction === 'received');
        if (!received.length) {
            section.classList.add('hidden');
            return;
        }
        section.classList.remove('hidden');
        list.innerHTML = received.map(r => `
            <div class="apoio-request-card">
                <div class="mural-avatar" style="background:${escapeHtml(r.other_avatar)}">${(r.other_name || 'A')[0].toUpperCase()}</div>
                <div class="apoio-request-info">
                    <div class="apoio-request-name">${escapeHtml(r.other_name)}</div>
                    ${r.card_title ? `<div class="apoio-request-msg">Re: ${escapeHtml(r.card_title)}</div>` : ''}
                    ${r.message ? `<div class="apoio-request-msg">"${escapeHtml(r.message)}"</div>` : ''}
                </div>
                <div class="apoio-request-actions">
                    <button class="apoio-req-btn accept" onclick="respondRequest(${r.id},'accept',this)">Aceitar</button>
                    <button class="apoio-req-btn reject" onclick="respondRequest(${r.id},'reject',this)">Recusar</button>
                </div>
            </div>
        `).join('');
    } catch { /* silent */ }
}

async function respondRequest(reqId, action, btn) {
    try {
        const res = await authFetch(`/api/apoio/requests/${reqId}/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action }),
        });
        const data = await res.json();
        if (data.success) {
            showRedeToast(data.message);
            loadConnectionRequests();
        }
    } catch { /* silent */ }
}

let servicosCache = null;

async function loadServicos() {
    try {
        const res = await authFetch('/api/rede/servicos');
        servicosCache = await res.json();
        renderServicos(servicosCache);
    } catch {
        servicosCache = [];
    }
}

function filterServicos(btn, cat) {
    document.querySelectorAll('.servicos-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (!servicosCache) return;
    const filtered = cat ? servicosCache.filter(s => s.category === cat) : servicosCache;
    renderServicos(filtered);
}

function renderServicos(list) {
    const el = document.getElementById('servicos-list');
    if (!el) return;
    if (!list.length) {
        el.innerHTML = `<p class="mural-empty">${t('servicos_empty')}</p>`;
        return;
    }
    el.innerHTML = list.map(s => `
        <div class="servico-card">
            <div class="servico-title">${escapeHtml(s.title)}</div>
            <div class="servico-desc">${escapeHtml(s.desc)}</div>
            <div class="servico-meta">
                <span class="servico-org">${escapeHtml(s.org)}</span>
                <span class="servico-location">📍 ${escapeHtml(s.location)}</span>
                <span class="servico-cat-badge">${s.category}</span>
                <span>${s.country === 'BR' ? '🇧🇷' : '🇵🇹'}</span>
            </div>
        </div>
    `).join('');
}


// ══════════════════════════════════════════════════════════
// TAB 4 — MEU ESPAÇO
// ══════════════════════════════════════════════════════════

async function loadProfile() {
    try {
        const res = await authFetch('/api/profile');
        const u   = await res.json();
        const set    = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
        set('profile-name',     u.name);
        set('profile-username', '@' + u.username);
        set('profile-avatar',   u.name.charAt(0).toUpperCase());
        set('profile-bio-text', u.bio || t('profile_bio_empty'));
        set('stat-messages',    u.messages_count);
        set('stat-since',       u.member_since);
        setVal('edit-name', u.name);
        setVal('edit-bio',  u.bio || '');

        const avImg = document.getElementById('profile-avatar-img');
        const avLetter = document.getElementById('profile-avatar');
        if (u.avatar_url && avImg) {
            avImg.src = u.avatar_url + '?t=' + Date.now();
            avImg.classList.remove('hidden');
            if (avLetter) avLetter.classList.add('hidden');
        } else {
            if (avImg) avImg.classList.add('hidden');
            if (avLetter) { avLetter.classList.remove('hidden'); avLetter.style.background = u.avatar_color || '#8B2635'; }
        }
    } catch {
        showToast(t('toast_error_profile'));
    }

}

async function saveProfile() {
    const name = document.getElementById('edit-name')?.value.trim();
    const bio  = document.getElementById('edit-bio')?.value.trim();
    if (!name) { showToast(t('toast_name_required')); return; }
    try {
        await authFetch('/api/update_profile', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ name, bio })
        });
        showToast(t('toast_profile_updated'));
        await loadProfile();
    } catch {
        showToast(t('toast_error_profile'));
    }
}


// ══════════════════════════════════════════════════════════
// SHARED UTILITIES
// ══════════════════════════════════════════════════════════
let toastTimer;
function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 2800);
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}


// ══════════════════════════════════════════════════════════
// VOICE / TTS
// ══════════════════════════════════════════════════════════
let currentAudio = null;
let currentTTSBtn = null;
let whisperModeActive = false;
let pilulasList = [];
let currentPilula = null;
let pilulaAudio = null;

function toggleWhisperMode() {
    whisperModeActive = !whisperModeActive;
    const btn = document.getElementById('whisper-toggle');
    if (btn) btn.classList.toggle('active', whisperModeActive);
}

async function playMessageTTS(btn) {
    const enabledToggle = document.getElementById('voice-enabled-toggle');
    if (enabledToggle && !enabledToggle.checked) {
        showToast('Voz desativada. Ative em Meu Espaço.');
        return;
    }
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        if (currentTTSBtn) {
            currentTTSBtn.querySelector('.tts-icon')?.classList.remove('hidden');
            currentTTSBtn.querySelector('.tts-wave')?.classList.add('hidden');
            currentTTSBtn.classList.remove('playing');
        }
        if (currentTTSBtn === btn) { currentTTSBtn = null; return; }
    }

    const text = btn.dataset.text;
    const sentiment = btn.dataset.sentiment || 'neutro';
    if (!text) return;

    btn.classList.add('loading');
    currentTTSBtn = btn;

    try {
        const res = await authFetch('/api/alice/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, sentiment, whisper: whisperModeActive })
        });
        const data = await res.json();
        if (data.error) { showToast(data.error); btn.classList.remove('loading'); return; }

        const audioSrc = 'data:audio/mp3;base64,' + data.audio;
        currentAudio = new Audio(audioSrc);

        btn.classList.remove('loading');
        btn.classList.add('playing');
        btn.querySelector('.tts-icon')?.classList.add('hidden');
        btn.querySelector('.tts-wave')?.classList.remove('hidden');

        currentAudio.play();
        currentAudio.onended = () => {
            btn.classList.remove('playing');
            btn.querySelector('.tts-icon')?.classList.remove('hidden');
            btn.querySelector('.tts-wave')?.classList.add('hidden');
            currentAudio = null;
            currentTTSBtn = null;
        };
    } catch {
        btn.classList.remove('loading');
        showToast('Erro ao gerar áudio.');
        currentTTSBtn = null;
    }
}

async function loadPilulas() {
    try {
        const res = await authFetch(`/api/alice/pilulas?lang=${currentLang}`);
        pilulasList = await res.json();
        if (pilulasList.length) showRandomPilula();
    } catch {}
}

function showRandomPilula() {
    if (!pilulasList.length) return;
    const idx = Math.floor(Math.random() * pilulasList.length);
    currentPilula = pilulasList[idx];
    const textEl = document.getElementById('pilula-text');
    const authorEl = document.getElementById('pilula-author');
    const sourceEl = document.getElementById('pilula-source');
    if (textEl) textEl.textContent = `"${currentPilula.text}"`;
    if (authorEl) authorEl.textContent = `— ${currentPilula.author}`;
    if (sourceEl) sourceEl.textContent = currentPilula.source || '';
    const progWrap = document.getElementById('pilula-progress-wrap');
    if (progWrap) progWrap.style.display = 'none';
    const playIcon = document.getElementById('pilula-play-icon');
    if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
}

function shufflePilula() {
    if (pilulaAudio) { pilulaAudio.pause(); pilulaAudio = null; }
    showRandomPilula();
}

async function playPilulaAudio() {
    if (!currentPilula) return;

    if (pilulaAudio && !pilulaAudio.paused) {
        pilulaAudio.pause();
        pilulaAudio = null;
        const progWrap = document.getElementById('pilula-progress-wrap');
        if (progWrap) progWrap.style.display = 'none';
        const playIcon = document.getElementById('pilula-play-icon');
        if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
        return;
    }

    const btn = document.getElementById('pilula-play-btn');
    if (btn) btn.classList.add('loading');

    try {
        const res = await authFetch('/api/alice/pilula/audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentPilula.id, lang: currentLang })
        });
        const data = await res.json();
        if (data.error) { showToast(data.error); if (btn) btn.classList.remove('loading'); return; }

        pilulaAudio = new Audio('data:audio/mp3;base64,' + data.audio);
        if (btn) btn.classList.remove('loading');

        const progWrap = document.getElementById('pilula-progress-wrap');
        const progFill = document.getElementById('pilula-progress-fill');
        if (progWrap) progWrap.style.display = 'flex';

        const playIcon = document.getElementById('pilula-play-icon');
        if (playIcon) playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';

        pilulaAudio.play();
        pilulaAudio.ontimeupdate = () => {
            if (pilulaAudio && pilulaAudio.duration && progFill) {
                progFill.style.width = (pilulaAudio.currentTime / pilulaAudio.duration * 100) + '%';
            }
        };
        pilulaAudio.onended = () => {
            if (progWrap) progWrap.style.display = 'none';
            if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
            pilulaAudio = null;
        };
    } catch {
        if (btn) btn.classList.remove('loading');
        showToast('Erro ao gerar áudio da pílula.');
    }
}

async function loadVoicePrefs() {
    try {
        const res = await authFetch('/api/voice/preferences');
        const data = await res.json();
        const enabledToggle = document.getElementById('voice-enabled-toggle');
        const whisperToggle = document.getElementById('whisper-mode-toggle');
        const speedSlider = document.getElementById('voice-speed-slider');
        const speedValue = document.getElementById('voice-speed-value');

        if (enabledToggle) enabledToggle.checked = data.voice_enabled;
        if (whisperToggle) { whisperToggle.checked = data.whisper_mode; whisperModeActive = data.whisper_mode; }
        if (speedSlider) speedSlider.value = data.voice_speed;
        if (speedValue) speedValue.textContent = data.voice_speed.toFixed(1) + 'x';

        document.querySelectorAll('.voice-profile-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.profile === data.voice_profile);
        });

        const whisperBtn = document.getElementById('whisper-toggle');
        if (whisperBtn) whisperBtn.classList.toggle('active', data.whisper_mode);
    } catch {}
}

function selectVoiceProfile(btn) {
    document.querySelectorAll('.voice-profile-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    saveVoicePrefs();
}

function updateSpeedLabel(slider) {
    const val = document.getElementById('voice-speed-value');
    if (val) val.textContent = parseFloat(slider.value).toFixed(1) + 'x';
}

async function saveVoicePrefs() {
    const enabled = document.getElementById('voice-enabled-toggle')?.checked ?? true;
    const whisper = document.getElementById('whisper-mode-toggle')?.checked ?? false;
    const speed = parseFloat(document.getElementById('voice-speed-slider')?.value || '1.0');
    const profileBtn = document.querySelector('.voice-profile-btn.active');
    const profile = profileBtn?.dataset.profile || 'acolhedora';

    whisperModeActive = whisper;
    const whisperBtn = document.getElementById('whisper-toggle');
    if (whisperBtn) whisperBtn.classList.toggle('active', whisper);

    try {
        await authFetch('/api/voice/preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                voice_enabled: enabled,
                voice_profile: profile,
                voice_speed: speed,
                whisper_mode: whisper
            })
        });
    } catch {}
}


// ══════════════════════════════════════════════════════════
// SCANNER DE DISCURSO
// ══════════════════════════════════════════════════════════
function openScanner() {
    exitChatFullscreen();
    document.getElementById('home-landing')?.classList.add('hidden');
    document.getElementById('home-welcome')?.classList.add('hidden');
    document.getElementById('alice-chat-list')?.classList.add('hidden');
    document.getElementById('alice-input-bar')?.classList.add('hidden');
    document.getElementById('chat-topbar')?.classList.add('hidden');
    document.getElementById('scanner-view')?.classList.remove('hidden');
    document.getElementById('btn-back')?.classList.remove('hidden');
    document.getElementById('header-logo')?.classList.add('hidden');
    const titleEl = document.getElementById('header-title');
    if (titleEl) titleEl.textContent = t('scanner_title');
    document.getElementById('scanner-result')?.classList.add('hidden');
    document.getElementById('scanner-loading')?.classList.add('hidden');
    const ta = document.getElementById('scanner-textarea');
    if (ta) { ta.value = ''; ta.placeholder = t('scanner_placeholder'); }
    document.getElementById('scanner-char-count').textContent = '0';
}

function updateScannerCount() {
    const ta = document.getElementById('scanner-textarea');
    const count = document.getElementById('scanner-char-count');
    if (ta && count) count.textContent = ta.value.length;
}

let pendingScannerFiles = [];

function handleScannerFileSelect(input) {
    if (!input.files?.length) return;
    validateAndAddFiles(Array.from(input.files), pendingScannerFiles, 10);
    input.value = '';
    renderFilePreviewList('scanner-attach-preview', pendingScannerFiles, removeScannerFile);
}

function removeScannerFile(idx) {
    pendingScannerFiles.splice(idx, 1);
    renderFilePreviewList('scanner-attach-preview', pendingScannerFiles, removeScannerFile);
}

function removeScannerAttachment() {
    pendingScannerFiles = [];
    const input = document.getElementById('scanner-file-input');
    if (input) input.value = '';
    const container = document.getElementById('scanner-attach-preview');
    if (container) { container.innerHTML = ''; container.classList.add('hidden'); }
}

async function submitScanner() {
    const ta = document.getElementById('scanner-textarea');
    const text = ta?.value?.trim();
    const hasFiles = pendingScannerFiles.length > 0;

    if (!hasFiles && (!text || text.length < 20)) {
        showToast(t('toast_scanner_min'));
        return;
    }

    const btn = document.getElementById('btn-scanner-submit');
    const loading = document.getElementById('scanner-loading');
    const result = document.getElementById('scanner-result');
    const content = document.getElementById('scanner-result-content');

    if (btn) btn.disabled = true;
    loading?.classList.remove('hidden');
    result?.classList.add('hidden');

    try {
        let res;
        if (hasFiles) {
            const formData = new FormData();
            pendingScannerFiles.forEach(f => formData.append('files', f));
            if (text) formData.append('text', text);
            const token = localStorage.getItem('alice_token');
            res = await fetch('/api/alice/scanner/upload', {
                method: 'POST',
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                body: formData
            });
            removeScannerAttachment();
        } else {
            res = await authFetch('/api/alice/scanner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
        }
        const data = await res.json();
        if (data.analysis) {
            content.textContent = '';
            data.analysis.split('\n').forEach((line, i, arr) => {
                content.appendChild(document.createTextNode(line));
                if (i < arr.length - 1) content.appendChild(document.createElement('br'));
            });
            result?.classList.remove('hidden');
        } else {
            showToast(data.error || t('toast_scanner_error'));
        }
    } catch {
        showToast(t('toast_error_scanner'));
    } finally {
        loading?.classList.add('hidden');
        if (btn) btn.disabled = false;
    }
}

// ══════════════════════════════════════════════════════════
// VOZ COLETIVA
// ══════════════════════════════════════════════════════════
async function loadVozColetiva() {
    const textEl = document.getElementById('voz-coletiva-text');
    const timeEl = document.getElementById('voz-coletiva-time');
    if (!textEl) return;
    textEl.textContent = t('voz_coletiva_listening');

    try {
        const res = await authFetch('/api/rede/voz-coletiva');
        const data = await res.json();
        if (data.summary) {
            textEl.textContent = data.summary;
            if (data.generated_at && timeEl) {
                const ago = timeSince(new Date(data.generated_at));
                timeEl.textContent = ago;
            }
        } else {
            textEl.textContent = t('voz_coletiva_listening');
        }
    } catch {
        textEl.textContent = t('voz_coletiva_listening');
    }
}

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return t('voz_coletiva_updated');
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
}

// ══════════════════════════════════════════════════════════
// SAÍDA SEGURA
// ══════════════════════════════════════════════════════════
function safeExit() {
    localStorage.removeItem('alice_token');
    localStorage.removeItem('alice_user');
    sessionStorage.clear();
    window.location.replace('https://www.google.com');
}

let lastEscapeTime = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscapeTime < 500) {
            safeExit();
        }
        lastEscapeTime = now;
    }
});

// ══════════════════════════════════════════════════════════
// AVATAR UPLOAD WITH CROP
// ══════════════════════════════════════════════════════════
let _cropState = null;

function uploadAvatar(input) {
    const file = input.files?.[0];
    if (!file) return;
    input.value = '';
    openCropModal(file);
}

function openCropModal(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => showCropUI(img, callback);
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function showCropUI(sourceImg, callback) {
    let existing = document.getElementById('crop-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'crop-modal-overlay';
    overlay.className = 'crop-modal-overlay';
    overlay.innerHTML = `
        <div class="crop-modal">
            <div class="crop-modal-header">
                <span class="crop-modal-title">Ajustar foto</span>
                <button class="crop-modal-close" id="crop-close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="crop-canvas-wrap" id="crop-canvas-wrap">
                <canvas id="crop-canvas"></canvas>
                <svg class="crop-overlay-mask" id="crop-overlay-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <mask id="crop-hole">
                            <rect width="100" height="100" fill="white"/>
                            <circle cx="50" cy="50" r="40" fill="black"/>
                        </mask>
                    </defs>
                    <rect width="100" height="100" fill="rgba(0,0,0,0.5)" mask="url(#crop-hole)"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="0.5"/>
                </svg>
            </div>
            <div class="crop-zoom-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <input type="range" class="crop-zoom-slider" id="crop-zoom" min="100" max="300" value="100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <div class="crop-modal-actions">
                <button class="crop-btn crop-btn--cancel" id="crop-cancel">Cancelar</button>
                <button class="crop-btn crop-btn--confirm" id="crop-confirm">Confirmar</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const canvas = document.getElementById('crop-canvas');
    const wrap = document.getElementById('crop-canvas-wrap');
    const ctx = canvas.getContext('2d');
    const wrapRect = wrap.getBoundingClientRect();
    const size = wrapRect.width;
    canvas.width = size * 2;
    canvas.height = size * 2;

    const minScale = size / Math.min(sourceImg.width, sourceImg.height);
    const initialScale = minScale;

    _cropState = {
        img: sourceImg,
        scale: initialScale,
        minScale: minScale,
        offsetX: (size * 2 - sourceImg.width * initialScale) / 2,
        offsetY: (size * 2 - sourceImg.height * initialScale) / 2,
        canvasSize: size * 2,
        dragging: false,
        lastX: 0,
        lastY: 0,
        pinchDist: 0
    };

    const zoomSlider = document.getElementById('crop-zoom');
    zoomSlider.value = 100;

    function drawCrop() {
        const s = _cropState;
        ctx.clearRect(0, 0, s.canvasSize, s.canvasSize);
        ctx.drawImage(s.img, s.offsetX, s.offsetY, s.img.width * s.scale, s.img.height * s.scale);
    }

    function clampOffsets() {
        const s = _cropState;
        const imgW = s.img.width * s.scale;
        const imgH = s.img.height * s.scale;
        const circleR = s.canvasSize * 0.4;
        const cx = s.canvasSize / 2;
        const cy = s.canvasSize / 2;
        const minX = cx + circleR - imgW;
        const maxX = cx - circleR;
        const minY = cy + circleR - imgH;
        const maxY = cy - circleR;
        s.offsetX = Math.min(maxX, Math.max(minX, s.offsetX));
        s.offsetY = Math.min(maxY, Math.max(minY, s.offsetY));
    }

    clampOffsets();
    drawCrop();

    zoomSlider.addEventListener('input', () => {
        const s = _cropState;
        const centerX = s.canvasSize / 2;
        const centerY = s.canvasSize / 2;
        const oldScale = s.scale;
        const zoomVal = parseInt(zoomSlider.value);
        s.scale = s.minScale * (zoomVal / 100);
        const ratio = s.scale / oldScale;
        s.offsetX = centerX - (centerX - s.offsetX) * ratio;
        s.offsetY = centerY - (centerY - s.offsetY) * ratio;
        clampOffsets();
        drawCrop();
    });

    function pointerDown(e) {
        e.preventDefault();
        _cropState.dragging = true;
        const pt = e.touches ? e.touches[0] : e;
        _cropState.lastX = pt.clientX;
        _cropState.lastY = pt.clientY;
        if (e.touches && e.touches.length === 2) {
            _cropState.pinchDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }
    function pointerMove(e) {
        if (!_cropState.dragging) return;
        e.preventDefault();
        const s = _cropState;
        if (e.touches && e.touches.length === 2) {
            const newDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            if (s.pinchDist > 0) {
                const ratio = newDist / s.pinchDist;
                const oldScale = s.scale;
                s.scale = Math.max(s.minScale, Math.min(s.minScale * 3, s.scale * ratio));
                const scaleRatio = s.scale / oldScale;
                const cx = s.canvasSize / 2;
                const cy = s.canvasSize / 2;
                s.offsetX = cx - (cx - s.offsetX) * scaleRatio;
                s.offsetY = cy - (cy - s.offsetY) * scaleRatio;
                const zoomPct = Math.round((s.scale / s.minScale) * 100);
                zoomSlider.value = Math.min(300, Math.max(100, zoomPct));
            }
            s.pinchDist = newDist;
        } else {
            const pt = e.touches ? e.touches[0] : e;
            const ratio = s.canvasSize / (s.canvasSize / 2);
            s.offsetX += (pt.clientX - s.lastX) * ratio;
            s.offsetY += (pt.clientY - s.lastY) * ratio;
            s.lastX = pt.clientX;
            s.lastY = pt.clientY;
        }
        clampOffsets();
        drawCrop();
    }
    function pointerUp() {
        _cropState.dragging = false;
        _cropState.pinchDist = 0;
    }

    wrap.addEventListener('mousedown', pointerDown);
    wrap.addEventListener('mousemove', pointerMove);
    wrap.addEventListener('mouseup', pointerUp);
    wrap.addEventListener('mouseleave', pointerUp);
    wrap.addEventListener('touchstart', pointerDown, { passive: false });
    wrap.addEventListener('touchmove', pointerMove, { passive: false });
    wrap.addEventListener('touchend', pointerUp);

    document.getElementById('crop-close').addEventListener('click', closeCropModal);
    document.getElementById('crop-cancel').addEventListener('click', closeCropModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCropModal(); });

    document.getElementById('crop-confirm').addEventListener('click', () => {
        const s = _cropState;
        const outCanvas = document.createElement('canvas');
        outCanvas.width = 400;
        outCanvas.height = 400;
        const outCtx = outCanvas.getContext('2d');
        const circleR = s.canvasSize * 0.4;
        const cropX = (s.canvasSize / 2 - circleR - s.offsetX) / s.scale;
        const cropY = (s.canvasSize / 2 - circleR - s.offsetY) / s.scale;
        const cropSize = (circleR * 2) / s.scale;
        outCtx.drawImage(s.img, cropX, cropY, cropSize, cropSize, 0, 0, 400, 400);

        outCanvas.toBlob(async (blob) => {
            if (!blob) { showToast(t('toast_error_photo')); return; }
            closeCropModal();
            if (callback) {
                callback(blob);
            } else {
                await sendCroppedAvatar(blob);
            }
        }, 'image/jpeg', 0.80);
    });
}

function closeCropModal() {
    const overlay = document.getElementById('crop-modal-overlay');
    if (overlay) overlay.remove();
    _cropState = null;
}

async function sendCroppedAvatar(blob) {
    const formData = new FormData();
    formData.append('avatar', blob, 'avatar.jpg');

    try {
        const token = getToken();
        const res = await fetch('/api/profile/avatar', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
            body: formData
        });
        const data = await res.json();
        if (data.avatar_url) {
            const avImg = document.getElementById('profile-avatar-img');
            const avLetter = document.getElementById('profile-avatar');
            if (avImg) {
                avImg.src = data.avatar_url + '?t=' + Date.now();
                avImg.classList.remove('hidden');
            }
            if (avLetter) avLetter.classList.add('hidden');
            showToast(t('toast_photo_updated'));
        } else {
            showToast(data.error || t('toast_error_photo'));
        }
    } catch {
        showToast(t('toast_error_photo'));
    }
}

// ══════════════════════════════════════════════════════════
// ONBOARDING PHOTO STEP
// ══════════════════════════════════════════════════════════
let _onboardingCroppedBlob = null;

function showOnboardingPhotoStep() {
    const chatArea = document.getElementById('onboarding-chat');
    const header = document.querySelector('.onboarding-header');
    if (chatArea) chatArea.style.display = 'none';
    if (header) header.style.display = 'none';
    const photoStep = document.getElementById('onboarding-photo-step');
    if (photoStep) photoStep.classList.remove('hidden');
    applyTranslations();
}

function onboardingTakePhoto() {
    document.getElementById('onboarding-photo-camera-input')?.click();
}

function onboardingPickPhoto() {
    document.getElementById('onboarding-photo-gallery-input')?.click();
}

function onboardingPhotoSelected(input) {
    const file = input.files?.[0];
    if (!file) return;
    input.value = '';
    openCropModal(file, (blob) => {
        _onboardingCroppedBlob = blob;
        const img = document.getElementById('onboarding-photo-img');
        const preview = document.getElementById('onboarding-photo-preview');
        const icon = document.getElementById('onboarding-photo-icon');
        const buttons = document.getElementById('onboarding-photo-buttons');
        const confirmWrap = document.getElementById('onboarding-photo-confirm-wrap');
        if (img) img.src = URL.createObjectURL(blob);
        if (preview) preview.classList.remove('hidden');
        if (icon) icon.classList.add('hidden');
        if (buttons) buttons.classList.add('hidden');
        if (confirmWrap) confirmWrap.classList.remove('hidden');
    });
}

async function onboardingConfirmPhoto() {
    if (!_onboardingCroppedBlob) return;
    const formData = new FormData();
    formData.append('avatar', _onboardingCroppedBlob, 'avatar.jpg');
    try {
        const token = getToken();
        const res = await fetch('/api/profile/avatar', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
            body: formData
        });
        const data = await res.json();
        if (data.avatar_url) {
            showToast(t('toast_photo_updated'));
        }
    } catch {}
    _onboardingCroppedBlob = null;
    await finishOnboardingAfterPhoto();
}

function onboardingRetakePhoto() {
    _onboardingCroppedBlob = null;
    const preview = document.getElementById('onboarding-photo-preview');
    const icon = document.getElementById('onboarding-photo-icon');
    const buttons = document.getElementById('onboarding-photo-buttons');
    const confirmWrap = document.getElementById('onboarding-photo-confirm-wrap');
    if (preview) preview.classList.add('hidden');
    if (icon) icon.classList.remove('hidden');
    if (buttons) buttons.classList.remove('hidden');
    if (confirmWrap) confirmWrap.classList.add('hidden');
}

async function onboardingSkipPhoto() {
    _onboardingCroppedBlob = null;
    await finishOnboardingAfterPhoto();
}

async function finishOnboardingAfterPhoto() {
    try { await authFetch('/api/onboarding/complete', { method: 'POST' }); } catch {}
    document.getElementById('onboarding-overlay')?.classList.add('hidden');
    const photoStep = document.getElementById('onboarding-photo-step');
    if (photoStep) photoStep.classList.add('hidden');
    requestUserGeolocation();
    await loadHomeTab();
}

// ══════════════════════════════════════════════════════════
// NOTIFICATIONS
// ══════════════════════════════════════════════════════════
let notifPollInterval = null;

function startNotifPolling() {
    pollNotifCount();
    notifPollInterval = setInterval(pollNotifCount, 30000);
}

async function pollNotifCount() {
    try {
        const res = await authFetch('/api/notifications/count');
        const data = await res.json();
        const badge = document.getElementById('notif-badge');
        if (badge) {
            if (data.count > 0) {
                badge.textContent = data.count > 9 ? '9+' : data.count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    } catch {}
}

function toggleNotifications() {
    const backdrop = document.getElementById('notif-backdrop');
    const sheet = document.getElementById('notif-sheet');
    if (!backdrop || !sheet) return;
    const isOpen = !sheet.classList.contains('hidden');
    if (isOpen) {
        backdrop.classList.add('hidden');
        sheet.classList.add('hidden');
    } else {
        backdrop.classList.remove('hidden');
        sheet.classList.remove('hidden');
        loadNotifications();
    }
}

async function loadNotifications() {
    try {
        const res = await authFetch('/api/notifications');
        const notifs = await res.json();
        const list = document.getElementById('notif-list');
        if (!list) return;
        if (!notifs.length) {
            list.innerHTML = '<p class="notif-empty">Nenhuma notificação.</p>';
            return;
        }
        list.innerHTML = notifs.map(n => {
            const time = new Date(n.created_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
            const initial = n.sender_name.charAt(0).toUpperCase();
            const text = n.type === 'activated'
                ? `<strong>${escHtml(n.sender_name)}</strong> ativou o Alerta Seguro! Acompanhe a localização.`
                : `<strong>${escHtml(n.sender_name)}</strong> desativou o Alerta Seguro.`;
            return `<div class="notif-item ${n.is_read ? '' : 'unread'}" onclick="openNotification(${n.id}, '${n.url}', '${n.type}')">
                <div class="notif-item-avatar">${n.sender_avatar ? `<img src="${n.sender_avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover">` : initial}</div>
                <div class="notif-item-body">
                    <div class="notif-item-text">${text}</div>
                    <div class="notif-item-time">${time}</div>
                </div>
            </div>`;
        }).join('');
    } catch {}
}

async function openNotification(id, url, type) {
    try { await authFetch(`/api/notifications/${id}/read`, { method: 'POST' }); } catch {}
    pollNotifCount();
    toggleNotifications();
    if (type === 'activated' && url) {
        window.open(url, '_blank');
    }
}

// ══════════════════════════════════════════════════════════
// ALERTA SEGURO
// ══════════════════════════════════════════════════════════
let alertLocationInterval = null;
let alertElapsedInterval = null;
let alertStartTime = null;

async function openAlertaSeguro() {
    document.getElementById('alerta-seguro-view')?.classList.remove('hidden');
    await loadEmergencyContacts();
    await checkAlertStatus();
}

function closeAlertaSeguro() {
    document.getElementById('alerta-seguro-view')?.classList.add('hidden');
}

async function loadEmergencyContacts() {
    try {
        const res = await authFetch('/api/emergency/contacts');
        const contacts = await res.json();
        const list = document.getElementById('emergency-contacts-list');
        const addBtn = document.getElementById('btn-add-contact');
        const activateBtn = document.getElementById('btn-activate-alert');
        if (!list) return;
        if (!contacts.length) {
            list.innerHTML = '';
        } else {
            list.innerHTML = contacts.map(c => {
                const initial = c.name.charAt(0).toUpperCase();
                const avatar = c.avatar_url
                    ? `<img src="${c.avatar_url}" alt="${escHtml(c.name)}">`
                    : initial;
                return `<div class="emergency-contact-item">
                    <div class="emergency-contact-avatar">${avatar}</div>
                    <div class="emergency-contact-info">
                        <div class="emergency-contact-name">${escHtml(c.name)}</div>
                        <div class="emergency-contact-username">@${escHtml(c.username)}</div>
                    </div>
                    <button class="emergency-contact-remove" onclick="removeEmergencyContact(${c.id})">✕</button>
                </div>`;
            }).join('');
        }
        if (addBtn) addBtn.style.display = contacts.length >= 4 ? 'none' : '';
        if (activateBtn) activateBtn.disabled = contacts.length === 0;
    } catch {}
}

async function removeEmergencyContact(id) {
    try {
        await authFetch(`/api/emergency/contacts/${id}`, { method: 'DELETE' });
        await loadEmergencyContacts();
    } catch { showToast('Erro ao remover contato.'); }
}

function openContactSearch() {
    document.getElementById('contact-search-backdrop')?.classList.remove('hidden');
    document.getElementById('contact-search-sheet')?.classList.remove('hidden');
    document.getElementById('contact-search-input')?.focus();
    document.getElementById('contact-search-results').innerHTML = '';
}

function closeContactSearch() {
    document.getElementById('contact-search-backdrop')?.classList.add('hidden');
    document.getElementById('contact-search-sheet')?.classList.add('hidden');
    document.getElementById('contact-search-input').value = '';
}

let searchTimeout = null;
async function searchEmergencyContacts(q) {
    clearTimeout(searchTimeout);
    if (q.length < 2) {
        document.getElementById('contact-search-results').innerHTML = '';
        return;
    }
    searchTimeout = setTimeout(async () => {
        try {
            const res = await authFetch(`/api/emergency/search-users?q=${encodeURIComponent(q)}`);
            const users = await res.json();
            const el = document.getElementById('contact-search-results');
            if (!el) return;
            if (!users.length) {
                el.innerHTML = '<p style="text-align:center;color:#999;padding:12px;font-size:13px">Nenhuma usuária encontrada.</p>';
                return;
            }
            el.innerHTML = users.map(u => {
                const initial = u.name.charAt(0).toUpperCase();
                const av = u.avatar_url
                    ? `<div class="emergency-contact-avatar"><img src="${u.avatar_url}" alt=""></div>`
                    : `<div class="emergency-contact-avatar">${initial}</div>`;
                return `<div class="contact-search-item" onclick="addEmergencyContact('${escHtml(u.username)}')">
                    ${av}
                    <div class="emergency-contact-info">
                        <div class="emergency-contact-name">${escHtml(u.name)}</div>
                        <div class="emergency-contact-username">@${escHtml(u.username)}</div>
                    </div>
                </div>`;
            }).join('');
        } catch {}
    }, 300);
}

async function addEmergencyContact(username) {
    try {
        const res = await authFetch('/api/emergency/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        const data = await res.json();
        if (data.error) {
            showToast(data.error);
            return;
        }
        closeContactSearch();
        await loadEmergencyContacts();
    } catch { showToast('Erro ao adicionar contato.'); }
}

async function checkAlertStatus() {
    try {
        const res = await authFetch('/api/emergency/status');
        const data = await res.json();
        if (data.active) {
            showAlertActiveView(data.created_at);
        } else {
            showAlertInactiveView();
        }
    } catch {}
}

function showAlertActiveView(createdAt) {
    document.getElementById('alerta-inactive-view')?.classList.add('hidden');
    document.getElementById('alerta-active-view')?.classList.remove('hidden');
    alertStartTime = new Date(createdAt);
    clearInterval(alertElapsedInterval);
    clearInterval(alertLocationInterval);
    updateAlertElapsed();
    alertElapsedInterval = setInterval(updateAlertElapsed, 1000);
    startAlertLocationUpdates();
}

function showAlertInactiveView() {
    document.getElementById('alerta-inactive-view')?.classList.remove('hidden');
    document.getElementById('alerta-active-view')?.classList.add('hidden');
    clearInterval(alertElapsedInterval);
    clearInterval(alertLocationInterval);
}

function updateAlertElapsed() {
    if (!alertStartTime) return;
    const diff = Math.floor((Date.now() - alertStartTime.getTime()) / 1000);
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    const el = document.getElementById('alerta-elapsed');
    if (el) el.textContent = h > 0
        ? `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
        : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

async function activateAlert() {
    if (!navigator.geolocation) { showToast('Geolocalização não disponível.'); return; }
    const btn = document.getElementById('btn-activate-alert');
    if (btn) btn.disabled = true;
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            try {
                const res = await authFetch('/api/emergency/activate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
                });
                const data = await res.json();
                if (data.success) {
                    showAlertActiveView(data.created_at);
                    showToast('Alerta ativado! Suas contatas foram notificadas.');
                } else {
                    showToast(data.error || 'Erro ao ativar alerta.');
                    if (btn) btn.disabled = false;
                }
            } catch { showToast('Erro ao ativar alerta.'); if (btn) btn.disabled = false; }
        },
        () => { showToast('Não foi possível obter sua localização.'); if (btn) btn.disabled = false; },
        { enableHighAccuracy: true, timeout: 15000 }
    );
}

function startAlertLocationUpdates() {
    clearInterval(alertLocationInterval);
    alertLocationInterval = setInterval(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    await authFetch('/api/emergency/update-location', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
                    });
                } catch {}
            },
            () => {},
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, 15000);
}

async function deactivateAlert() {
    try {
        await authFetch('/api/emergency/deactivate', { method: 'POST' });
        showAlertInactiveView();
        await loadEmergencyContacts();
        showToast('Alerta desativado.');
    } catch { showToast('Erro ao desativar alerta.'); }
}

// ══════════════════════════════════════════════════════════
// MEU DIÁRIO
// ══════════════════════════════════════════════════════════
let editingNoteId = null;

async function openDiaryView() {
    if (userTier === 'essencial') { showFeatureUpgradeModal('Meu Diário'); return; }
    document.getElementById('diary-view')?.classList.remove('hidden');
    closeDiaryEditor();
    await loadDiaryNotes();
}

function closeDiaryView() {
    document.getElementById('diary-view')?.classList.add('hidden');
}

async function loadDiaryNotes() {
    try {
        const res = await authFetch('/api/diary/notes');
        const notes = await res.json();
        const list = document.getElementById('diary-notes-list');
        if (!list) return;
        if (!notes.length) {
            list.innerHTML = '<div class="diary-empty"><p>Seu diário está vazio.</p><p>Comece a escrever seus pensamentos, lembretes e reflexões...</p></div>';
            return;
        }
        const labelNames = { geral: 'Geral', para_lembrar: 'Para lembrar', nunca_esquecer: 'Nunca esquecer', minha_forca: 'Minha força' };
        list.innerHTML = notes.map(n => {
            const date = new Date(n.updated_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
            const preview = n.content.length > 80 ? n.content.substring(0, 80) + '...' : n.content;
            return `<div class="diary-note-card" onclick="editDiaryNote(${n.id})">
                <div class="diary-note-header">
                    <span class="diary-note-title">${escHtml(n.title)}</span>
                    <span class="diary-note-label" data-label="${n.label}">${labelNames[n.label] || n.label}</span>
                </div>
                ${preview ? `<p class="diary-note-preview">${escHtml(preview)}</p>` : ''}
                <div class="diary-note-footer">
                    <span class="diary-note-date">${date}</span>
                    <button class="diary-note-delete" onclick="event.stopPropagation(); deleteDiaryNote(${n.id})" title="Apagar">🗑</button>
                </div>
            </div>`;
        }).join('');
    } catch {}
}

function openDiaryEditor(note) {
    document.getElementById('diary-list-view')?.classList.add('hidden');
    document.getElementById('diary-editor-view')?.classList.remove('hidden');
    editingNoteId = note ? note.id : null;
    document.getElementById('diary-title-input').value = note ? note.title : '';
    document.getElementById('diary-content-input').value = note ? note.content : '';
    const label = note ? note.label : 'geral';
    document.querySelectorAll('.diary-label-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.label === label);
    });
}

function closeDiaryEditor() {
    document.getElementById('diary-list-view')?.classList.remove('hidden');
    document.getElementById('diary-editor-view')?.classList.add('hidden');
    editingNoteId = null;
}

function selectDiaryLabel(chip) {
    document.querySelectorAll('.diary-label-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
}

async function saveDiaryNote() {
    const title = document.getElementById('diary-title-input')?.value.trim();
    const content = document.getElementById('diary-content-input')?.value.trim();
    const label = document.querySelector('.diary-label-chip.active')?.dataset.label || 'geral';
    if (!title) { showToast('Título obrigatório.'); return; }
    const isEdit = !!editingNoteId;
    try {
        const url = editingNoteId ? `/api/diary/notes/${editingNoteId}` : '/api/diary/notes';
        const method = editingNoteId ? 'PUT' : 'POST';
        const res = await authFetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, label })
        });
        const data = await res.json();
        if (data.success) {
            closeDiaryEditor();
            await loadDiaryNotes();
            showToast(isEdit ? 'Nota atualizada.' : 'Nota salva.');
        } else {
            showToast(data.error || 'Erro ao salvar.');
        }
    } catch { showToast('Erro ao salvar nota.'); }
}

async function editDiaryNote(id) {
    try {
        const res = await authFetch('/api/diary/notes');
        const notes = await res.json();
        const note = notes.find(n => n.id === id);
        if (note) openDiaryEditor(note);
    } catch {}
}

async function deleteDiaryNote(id) {
    try {
        await authFetch(`/api/diary/notes/${id}`, { method: 'DELETE' });
        await loadDiaryNotes();
        showToast('Nota removida.');
    } catch { showToast('Erro ao remover nota.'); }
}

// ══════════════════════════════════════════════════════════
// SUBSCRIPTION — Upgrade Modal, Counter, Tier UI
// ══════════════════════════════════════════════════════════

function showUpgradeModal() {
    let modal = document.getElementById('upgrade-modal');
    if (modal) { modal.classList.remove('hidden'); return; }
    modal = document.createElement('div');
    modal.id = 'upgrade-modal';
    modal.className = 'upgrade-modal-backdrop';
    modal.innerHTML = `
        <div class="upgrade-modal-card">
            <h3>Atingiste o limite de 3 mensagens gratuitas por dia</h3>
            <p>Com o plano <strong>Irmandade</strong>, conversas com a Alice sem limites e tens acesso aos Mini Cursos.</p>
            <a href="/checkout" class="upgrade-modal-cta">Conhecer os planos</a>
            <button class="upgrade-modal-dismiss" onclick="document.getElementById('upgrade-modal').classList.add('hidden')">Continuar amanhã</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showFeatureUpgradeModal(feature) {
    let modal = document.getElementById('feature-upgrade-modal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'feature-upgrade-modal';
    modal.className = 'upgrade-modal-backdrop';
    modal.innerHTML = `
        <div class="upgrade-modal-card">
            <h3>${feature} é uma funcionalidade Premium</h3>
            <p>Faz upgrade para o plano <strong>Irmandade</strong> para desbloquear ${feature}, chat ilimitado e muito mais.</p>
            <a href="/checkout" class="upgrade-modal-cta">Conhecer os planos</a>
            <button class="upgrade-modal-dismiss" onclick="document.getElementById('feature-upgrade-modal').classList.add('hidden')">Voltar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function updateMessageCounter() {
    const counter = document.getElementById('msg-counter');
    if (!counter) return;
    if (userTier === 'essencial') {
        const remaining = Math.max(0, dailyMessageLimit - dailyMessagesUsed);
        counter.textContent = `${remaining}/${dailyMessageLimit} mensagens restantes hoje`;
        counter.classList.remove('hidden');
    } else {
        counter.classList.add('hidden');
    }
}

function updateTierUI() {
    const vipCard = document.getElementById('vip-consultora-card');
    if (vipCard) {
        if (userTier === 'vip') {
            vipCard.classList.remove('hidden');
            const badge = vipCard.querySelector('.vip-token-badge');
            if (badge) badge.textContent = vipTokens + ' sessão disponível';
        } else {
            vipCard.classList.add('hidden');
        }
    }
    const planCard = document.getElementById('meu-plano-card');
    if (planCard) {
        const tierNames = { essencial: 'Essencial', irmandade: 'Irmandade', vip: 'VIP' };
        const tierLabel = planCard.querySelector('.plan-tier-label');
        if (tierLabel) tierLabel.textContent = tierNames[userTier] || 'Essencial';
    }
}

async function useVipToken() {
    if (vipTokens <= 0) {
        showToast('Sem sessões disponíveis este mês.');
        return;
    }
    const ok = confirm(`Usar 1 sessão para agendar consultoria com uma profissional da rede ALICE? (${vipTokens} sessões restantes)`);
    if (!ok) return;
    try {
        const res = await authFetch('/api/subscription/use-token', { method: 'POST' });
        const data = await res.json();
        if (res.ok) {
            vipTokens = data.tokens_remaining;
            updateTierUI();
            showToast('Sessão agendada com sucesso! Entraremos em contacto em breve.');
        } else {
            showToast(data.error || 'Erro ao agendar.');
        }
    } catch { showToast('Erro de conexão.'); }
}


// ══════════════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const aliceInput = document.getElementById('alice-input');
    if (aliceInput) {
        aliceInput.addEventListener('input', () => {
            aliceInputResize(aliceInput);
            const btn = document.getElementById('btn-alice-send');
            if (btn) btn.classList.toggle('chat-send-pulse', aliceInput.value.trim().length > 0);
        });
    }

    const onboardingInput = document.getElementById('onboarding-input');
    if (onboardingInput) {
        onboardingInput.addEventListener('input', () => {
            aliceInputResize(onboardingInput);
            const btn = document.getElementById('btn-onboarding-send');
            if (btn) btn.classList.toggle('chat-send-pulse', onboardingInput.value.trim().length > 0);
        });
    }

    const redeInput = document.getElementById('rede-input');
    if (redeInput) redeInput.addEventListener('input', () => redeInputCount(redeInput));

    document.querySelectorAll('label[role="button"]').forEach(lbl => {
        lbl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbl.click(); }
        });
    });
});
